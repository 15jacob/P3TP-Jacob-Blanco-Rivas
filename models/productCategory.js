const { SEQUELIZE } = require('../db/db.js');
const { DataTypes } = require("sequelize");

const ProductCategory = SEQUELIZE.define("product_categories",
{
    id:
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:
    {
        type: DataTypes.STRING,
        allowNull: false,
        validate:
        {
            is: /[^a-zA-Z\s]+/,
            len: [3, 100]
        },
    }
},
{
    timestamps: false,
});

module.exports = { ProductCategory };