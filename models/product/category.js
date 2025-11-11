const { SEQUELIZE } = require('../../db/db.js');
const { DataTypes } = require("sequelize");

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
    Categoria.hasMany(models.Producto,
    {
        foreignKey: 'id_category',
        as: 'products'
    });
};

module.exports = { ProductCategory };