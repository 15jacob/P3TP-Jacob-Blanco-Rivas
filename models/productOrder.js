const { SEQUELIZE } = require('../db/db.js');
const { DataTypes } = require("sequelize");

const OrderProduct = SEQUELIZE.define("product_orders",
{
    id:
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
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
    },
    id_product:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
{
    timestamps: false,
});

module.exports = { OrderProduct };