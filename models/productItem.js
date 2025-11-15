const { SEQUELIZE } = require('../db/db.js');
const { DataTypes } = require("sequelize");

const ProductItem = SEQUELIZE.define("product_items",
{
    id:
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title:
    {
        type: DataTypes.STRING,
        validate:
        {
            is: /^[a-zA-Z\s]+$/,
            len: [3, 100]
        },
    },
    color:
    {
        type: DataTypes.STRING,
        allowNull: false,
        validate:
        {
            is: /^[a-zA-Z\s]+$/,
            len: [3, 20]
        },
    },
    price:
    {
        type: DataTypes.STRING,
        allowNull: false,
        validate:
        {
            is: /^(0|[1-9][0-9]*)$/,
            min: 0
        },
    },
    stock:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:
        {
            is: /^(0|[1-9][0-9]*)$/,
            min: 0
        },
    },
    image_url:
    {
        type: DataTypes.STRING,
        allowNull: false,
        validate:
        {
            is: /[^a-zA-Z\s]+/,
            len: [3, 255]
        },
    },
    attributes:
    {
        type: DataTypes.JSON,
        allowNull: true,
    },
    status:
    {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

module.exports = { ProductItem };
