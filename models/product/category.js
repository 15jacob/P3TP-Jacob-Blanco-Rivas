const { SEQUELIZE } = require('../../db/db.js');
const { DataTypes } = require("sequelize");

const { ProductItem } = require('./item.js');

const ProductCategory = SEQUELIZE.define("product_categories",
{
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
});

ProductCategory.associate = function(models)
{
    ProductCategory.hasMany(models.ProductItem,
    {
        foreignKey: 'id_category',
        as: 'category'
    });
};

module.exports = { ProductCategory };