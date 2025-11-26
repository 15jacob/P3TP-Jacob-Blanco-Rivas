//REQUIRES
const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');
const { SEQUELIZE } = require('./db/db.js');


//APP CONFIG
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(session({
    secret: 'cap-and-sock-secret',
    resave: false,
    saveUninitialized: false
}));


//ROUTING
const adminAuthRoutes = require('./routes/admin/views.js');
const adminProductRoutes = require('./routes/admin/api.js');
const storeViews = require('./routes/storeViews.js');

app.use('/admin', adminAuthRoutes);
app.use('/admin', adminProductRoutes);
app.use('/', storeViews);


//SEQUELIZE INIT
SEQUELIZE
.sync({ alter: true }) // force: true -> Elimina y vuelve a crear las tablas
.then(() => console.log(`Database connected successfully.`))
.then(() => app.listen(port, () => console.log(`Proyecto ejecutandose en puerto: ${port}`)))
.catch(error => console.error("Unable to connect to the database:", error));