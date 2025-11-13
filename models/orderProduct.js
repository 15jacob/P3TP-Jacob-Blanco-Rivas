const { SEQUELIZE } = require('../db/db.js');
const { DataTypes } = require("sequelize");

const OrderProduct = SEQUELIZE.define("order_products", {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = { OrderProduct };