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
const { ProductItem } = require('./models/product/item.js');
const { ProductCategory } = require('./models/product/category.js');

//RELACIONES
const models = { ProductItem, ProductCategory };

Object.keys(models).forEach(function(modelName)
{
    if(models[modelName].associate)
        models[modelName].associate(models);
});


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

app.get("/home", async function(req, res)
{
    try
    {
        const HTML = await ProductItem.findAll({
            where:
            {
                status: true
            },
            include:
            {
                model: ProductCategory,
                as: 'category'
            }
        })
        .then(data => data.map(user => user.toJSON()))
        .then(data => ejs.renderFile(path.join(__dirname, 'views', 'home.ejs'), {data: data}))

        res.send(HTML);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({ error: "Error en la consulta" });
    }
});

app.get("/users", async function(req, res)
{
    try
    {
        const HTML = await User.findAll()
        .then(data => data.map(user => user.toJSON()))
        .then(data => ejs.renderFile(path.join(__dirname, 'views', 'test.ejs'), {data: data}))

        res.send(HTML);
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