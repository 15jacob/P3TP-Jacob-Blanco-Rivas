const { SEQUELIZE } = require('../db/db.js');
const { DataTypes } = require("sequelize");

const Order = SEQUELIZE.define("orders",
{
    name:
    {
        type: DataTypes.STRING,
        allowNull: false,
        validate:
        {
            len: [3, 50]
        },
    },
    date:
    {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    products:
    {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    total:
    {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
});

//Order.belongsToMany(ProductItem, { through: OrderProduct, foreignKey: 'orderId' });

Order.associate = function(models)
{
    Order.belongsTo(models.ProductItem,
    {
        foreignKey: 'id_order',
        as: 'order'
    });
};

module.exports = { Order };