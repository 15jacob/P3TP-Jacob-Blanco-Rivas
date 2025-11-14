const { SEQUELIZE } = require('../db/db.js');
const { DataTypes } = require("sequelize");

const OrderProduct = SEQUELIZE.define("product_orders",
{
    quantity:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price:
    {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_order:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:
        {
            model: 'orders',
            key: 'id'
        }
    },
    id_product:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:
        {
            model: 'product_items',
            key: 'id'
        }
    },
},
{
    timestamps: false,
});

OrderProduct.associate = function(models)
{
    OrderProduct.belongsTo(models.OrderProduct,
    {
        foreignKey: 'id_product',
        as: 'product'
    });
};

module.exports = { OrderProduct };