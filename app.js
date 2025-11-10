const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const ejs = require('ejs');
const multer = require('multer');
const session = require('express-session');

const storage = multer.diskStorage({
    destination: function(req, file, cb)
    {
        cb(null, 'public/assets/img/');
    },
    filename: function(req, file, cb)
    {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

//Adapters
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(session({
    secret: 'cap-and-sock-secret',
    resave: false,
    saveUninitialized: false
}));


//MODELOS
const { SEQUELIZE } = require('./db/db.js');
const { User } = require('./models/user.js');
const { Product } = require('./models/product.js');
const { Order } = require('./models/order.js');
const { Category } = require('./models/category.js');

const requireAuth = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/admin/login');
    }
};
//RELACIONES
//???
Category.hasMany(Product, { foreignKey: 'id_category' });
Product.belongsTo(Category, { foreignKey: 'id_category' });

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

app.get('/admin/login', (req, res) => {
    if (req.session.user) {
        return res.redirect('/admin/dashboard');
    }
    res.render('admin/login', { 
        title: 'Login - Cap&Sock',
        error: req.query.error 
    });
});

app.post('/admin/login', async (req, res) => {
    try {
        const { user, password } = req.body;

        console.log('Intento de login con:', { user, password });

        const adminUser = await User.findOne({ 
            where: { 
                user: user
            } 
        });

        console.log('Usuario encontrado en BD:', adminUser ? 'Sí' : 'No');

        if (adminUser) {

            if (adminUser.password === password) {
                req.session.user = {
                    id: adminUser.id,
                    username: adminUser.user,
                    nombre: 'Administrador',
                    role: 'admin'
                };
                console.log('Login exitoso para:', adminUser.user);
                return res.redirect('/admin/dashboard');
            } else {
                console.log('Contraseña incorrecta');
            }
        } else {
            console.log('Usuario no encontrado en la BD');
        }
        
        res.redirect('/admin/login?error=Credenciales incorrectas');
    } catch (error) {
        console.error('Error en login:', error);
        res.redirect('/admin/login?error=Error interno del servidor');
    }
});

app.get('/admin/dashboard', requireAuth, async (req, res) => {
    try {
        const productos = await Product.findAll({ include: [Category] });
        const ventas = await Order.findAll({
            order: [['date', 'DESC']],
            limit: 10
        });
        const categorias = await Category.findAll();
        
        const productosActivos = productos.filter(p => p.status === true).length;
        const totalVentas = ventas.length;
        const ingresosTotales = ventas.reduce((sum, venta) => sum + parseFloat(venta.total), 0);
        const stockTotal = productos.reduce((sum, producto) => sum + producto.stock, 0);

        res.render('admin/dashboard', {
            productos: productos,
            ventas: ventas,
            categorias: categorias,
            estadisticas: {
                productosActivos: productosActivos,
                totalVentas: totalVentas,
                ingresosTotales: ingresosTotales,
                stockTotal: stockTotal
            },
            user: req.session.user,
            success: req.query.success,
            error: req.query.error
        });
    } catch (error) {
        console.error('Error en dashboard:', error);
        res.status(500).send('Error al cargar el dashboard');
    }
});

app.get('/admin/agregar-producto', requireAuth, async (req, res) => {
    try {
        const categorias = await Category.findAll();
        res.render('admin/agregar-producto', {
            title: 'Alta de Producto - Cap&Sock',
            categorias: categorias,
            user: req.session.user,
            success: req.query.success,
            error: req.query.error
        });
    } catch (error) {
        console.error('Error al cargar formulario:', error);
        res.status(500).send('Error al cargar el formulario');
    }
});

app.get('/admin/editar-producto/:id', requireAuth, async (req, res) => {
    try {
        const producto = await Product.findByPk(req.params.id);
        if (!producto) {
            return res.status(404).send('Producto no encontrado');
        }

        const categorias = await Category.findAll();

        res.render('admin/editar-producto', {
            title: 'Editar Producto - Cap&Sock',
            producto: producto,
            categorias: categorias,
            user:  req.session.user,
            success: req.query.success || null,
            error: req.query.error || null
        });
    } catch (error) {
        console.error('Error al cargar formulario de edición:', error);
        res.status(500).send('Error al cargar el formulario');
    }
});

app.post('/admin/productos/crear', requireAuth, upload.single('imagen'), async (req, res) => {
    try {  
        const { title, id_category, color, price, stock, status } = req.body;
        const attributes = req.body.attributes || {};
        
        const nuevoProducto = await Product.create({
            title,
            id_category: parseInt(id_category),
            color,
            price: parseFloat(price),
            stock: parseInt(stock),
            status: status === 'on',
            attributes: JSON.stringify(attributes),
            image_url: req.file ? `/assets/img/${req.file.filename}` : '/assets/img/placeholder.jpg'
        });

        console.log('Producto creado exitosamente:', nuevoProducto.id);
        res.redirect('/admin/dashboard?success=Producto creado correctamente');
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.redirect('/admin/agregar-producto?error=Error al crear el producto: ' + error.message);
    }
});

app.post('/admin/productos/actualizar/:id', requireAuth, upload.single('imagen'), async (req, res) => {
    try {  
        const { title, id_category, color, price, stock, status } = req.body;
        const attributes = req.body.attributes || {};
        const producto = await Product.findByPk(req.params.id);
        
        if (!producto) {
            return res.redirect('/admin/dashboard?error=Producto no encontrado');
        }

        const updateData = {
            title,
            id_category: parseInt(id_category),
            color,
            price: parseFloat(price),
            stock: parseInt(stock),
            status: status === 'on',
            attributes: JSON.stringify(attributes)
        };

        if (req.file) {
            updateData.image_url = `/assets/img/${req.file.filename}`;
        }

        await producto.update(updateData);
        res.redirect('/admin/dashboard?success=Producto actualizado correctamente');
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.redirect('/admin/editar-producto/' + req.params.id + '?error=Error al actualizar el producto');
    }
});

app.get('/admin/productos/eliminar/:id', requireAuth, async (req, res) => {
    try {
        const producto = await Product.findByPk(req.params.id);
        if (producto) {
            await producto.update({ status: false });
        }
        res.redirect('/admin/dashboard?success=Producto desactivado correctamente');
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.redirect('/admin/dashboard?error=Error al desactivar el producto');
    }
});

app.get('/admin/productos/activar/:id', async (req, res) => {
    try {
        const producto = await Product.findByPk(req.params.id);
        if (producto) {
            await producto.update({ status: true });
        }
        res.redirect('/admin/dashboard?success=Producto activado correctamente');
    } catch (error) {
        console.error('Error al activar producto:', error);
        res.redirect('/admin/dashboard?error=Error al activar el producto');
    }
});

app.get('/admin/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
});

// app.get('/admin/productos', async (req, res) => {
//     const productos = [
//         { id: 1, titulo: 'Gorra Negra Clásica', categoria: 'Gorra', precio: 12000, stock: 15, activo: true, tipo: 'Snapback' },
//         { id: 2, titulo: 'Media Deportiva Azul', categoria: 'Media', precio: 8500, stock: 20, activo: true, cania: 'Corta' },
//         { id: 3, titulo: 'Gorra Trucker Verde', categoria: 'Gorra', precio: 14500, stock: 5, activo: false, tipo: 'Trucker' }
//     ];

//     res.render('admin/productos', { productos: productos });
// });

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