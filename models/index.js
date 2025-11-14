const { User } = require('./user');
const { ProductItem } = require('./productItem.js');
const { ProductCategory } = require('./productCategory.js');
const { Order } = require('./order.js');
const { OrderProduct } = require('./productOrder.js');

const models = { ProductItem, ProductCategory };
/* 
Object.keys(models).forEach(function(modelName)
{
    if(models[modelName].associate)
        models[modelName].associate(models);
});
 */
module.exports = { User, ProductItem, ProductCategory, Order, OrderProduct };