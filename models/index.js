const { User } = require('./user');
const { ProductItem } = require('./product/item');
const { ProductCategory } = require('./product/category');

//Revisar estas tablas y su relacion
//const { Order } = require('./order');
//const { OrderProduct } = require('./productOrder');

module.exports = { User, ProductItem, ProductCategory };