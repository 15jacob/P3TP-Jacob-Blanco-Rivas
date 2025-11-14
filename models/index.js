const { User } = require('./user');
const { ProductItem } = require('./productItem.js');
const { ProductCategory } = require('./productCategory.js');

//Revisar estas tablas y su relacion
//const { Order } = require('./order');
//const { OrderProduct } = require('./productOrder');

const models = { ProductItem, ProductCategory };

Object.keys(models).forEach(function(modelName)
{
    if(models[modelName].associate)
        models[modelName].associate(models);
});

module.exports = { User, ProductItem, ProductCategory };