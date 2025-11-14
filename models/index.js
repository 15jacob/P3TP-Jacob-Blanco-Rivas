const { User } = require('./user');
const { ProductItem } = require('./productItem.js');
const { ProductCategory } = require('./productCategory.js');
const { Order } = require('./order.js');
const { OrderProduct } = require('./productOrder.js');

ProductCategory.hasMany(ProductItem,
{
    foreignKey: 'id_category',
    as: 'category'
});

ProductItem.belongsTo(ProductCategory,
{
    foreignKey: 'id_category',
    as: 'category'
});

OrderProduct.belongsTo(ProductItem,
{
    foreignKey: 'id_product',
    as: 'product'
});

OrderProduct.belongsTo(Order,
{
    foreignKey: 'id_order',
    as: 'order'
});

module.exports = { User, ProductItem, ProductCategory, Order, OrderProduct };