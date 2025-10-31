const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

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

app.listen(port, function()
{
    console.log(`Proyecto ejecutandose en puerto: ${port}`);
});
