const { SEQUELIZE } = require('../db/db.js');
const { DataTypes } = require("sequelize");

const Category = SEQUELIZE.define("product_categories",
{
    name:
    {
        type: DataTypes.STRING,
        allowNull: false,
        validate:
        {
            is: /[^a-zA-Z\s]+/,
            len: [3, 50]
        },
    },
}, {
    timestamps: false,
});

module.exports = { Category };