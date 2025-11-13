const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const ejs = require('ejs');

//Adapters
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.set('view engine', 'ejs');

//MODELOS
const { SEQUELIZE } = require('./db/db.js');
const { User } = require('./models/user.js');
<<<<<<< HEAD:app.js
const { Product } = require('./models/product.js');
const { Order } = require('./models/order.js');
const { Category } = require('./models/category.js');
=======
const { ProductItem } = require('./models/product/item.js.bak');
const { ProductCategory } = require('./models/product/category.js.bak');
const { getProducts } = require('./controllers/product/item.js.bak');
>>>>>>> c25c09b00f576a39d5551137859532167d41979c:app.js.bak

//RELACIONES
<<<<<<< HEAD:app.js
//???
Category.hasMany(Product, { foreignKey: 'id_category' });
Product.belongsTo(Category, { foreignKey: 'id_category' });
=======
const models = { ProductItem, ProductCategory };

Object.keys(models).forEach(function(modelName)
{
    if(models[modelName].associate)
        models[modelName].associate(models);
});

>>>>>>> c25c09b00f576a39d5551137859532167d41979c:app.js.bak

//RUTAS
app.get('/', function(req, res)
{
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/productos', function(req, res)
{
    res.sendFile(path.join(__dirname, 'public' ,'productos.html'));
});

app.get('/cart', function(req, res)
{
    res.sendFile(path.join(__dirname, 'public' ,'cart.html'));
});

app.get("/users", async function(req, res)
{
    try
    {
        //const users = await User.findAll();
        //res.render('test', users);
        
        //res.status(200).json(users);

        const rutaVista = path.join(__dirname, 'views', 'test.ejs');
        console.log(rutaVista);
        const html = await ejs.renderFile(rutaVista, {persona:'fulano'});
        res.send(html);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({ error: "Error en la consulta" });
    }
});

//Old?
/* app.listen(port, function()
{
    console.log(`Proyecto ejecutandose en puerto: ${port}`);
}); */

SEQUELIZE
.sync({ alter: true }) // force: true -> Elimina y vuelve a crear las tablas
.then(() => console.log(`Database connected successfully.`))
.then(function()
{
    app.listen(port, () => console.log(`Proyecto ejecutandose en puerto: ${port}`));
})
.catch(error => console.error("Unable to connect to the database:", error));