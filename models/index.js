const { User } = require('./user');
const { Product } = require('./product');
const { Order } = require('./order');
const { Category } = require('./category');
const { OrderProduct } = require('./orderProduct');

Order.belongsToMany(Product, { through: OrderProduct, foreignKey: 'orderId' });
Product.belongsToMany(Order, { through: OrderProduct, foreignKey: 'productId' });

module.exports = { User, Product, Order, Category, OrderProduct };