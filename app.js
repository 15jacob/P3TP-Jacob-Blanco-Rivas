const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

//Adapters
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.json());
// app.set('view engine', 'ejs');

//MODELOS
const { SEQUELIZE } = require('./db/db.js');
const { User } = require('./models/user.js');

//RELACIONES
//???

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
        const html = await ejs.renderFile(rutaVista, {persona:'fulano'});
        res.send(html);
    }
    catch(error)
    {
        res.status(500).json({ error: "Error en la consulta" });
    }
});

//Old?
app.listen(port, function()
{
    console.log(`Proyecto ejecutandose en puerto: ${port}`);
});

// SEQUELIZE
// .sync({ alter: true }) // force: true -> Elimina y vuelve a crear las tablas
// .then(() => console.log(`Database connected successfully.`))
// .then(function()
// {
//     app.listen(port, () => console.log(`Proyecto ejecutandose en puerto: ${port}`));
// })
// .catch(error => console.error("Unable to connect to the database:", error));
