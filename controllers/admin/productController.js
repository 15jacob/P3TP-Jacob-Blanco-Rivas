const { Product, Category, Order } = require('../../models/index');

const dashboard = async (req, res) => {
    try {
        const productos = await Product.findAll({ include: [Category] });
        const ventas = await Order.findAll({ order: [['date', 'DESC']], limit: 10 });
        const categorias = await Category.findAll();
        
        const productosActivos = productos.filter(p => p.status === true).length;
        const totalVentas = ventas.length;
        const ingresosTotales = ventas.reduce((sum, venta) => sum + parseFloat(venta.total), 0);
        const stockTotal = productos.reduce((sum, producto) => sum + producto.stock, 0);

        res.render('admin/dashboard', {
            productos, ventas, categorias,
            estadisticas: { productosActivos, totalVentas, ingresosTotales, stockTotal },
            user: req.session.user,
            success: req.query.success,
            error: req.query.error
        });
    } catch (error) {
        console.error('Error en dashboard:', error);
        res.status(500).send('Error al cargar el dashboard');
    }
};

const agregarProductoForm = async (req, res) => {
    try {
        const categorias = await Category.findAll();
        res.render('admin/agregar-producto', {
            title: 'Alta de Producto - Cap&Sock',
            categorias,
            user: req.session.user,
            success: req.query.success,
            error: req.query.error
        });
    } catch (error) {
        console.error('Error al cargar formulario:', error);
        res.status(500).send('Error al cargar el formulario');
    }
};

const editarProductoForm = async (req, res) => {
    try {
        const producto = await Product.findByPk(req.params.id);
        if (!producto) return res.status(404).send('Producto no encontrado');
        const categorias = await Category.findAll();
        res.render('admin/editar-producto', {
            title: 'Editar Producto - Cap&Sock',
            producto,
            categorias,
            user: req.session.user,
            success: req.query.success || null,
            error: req.query.error || null
        });
    } catch (error) {
        console.error('Error al cargar edición:', error);
        res.status(500).send('Error al cargar el formulario');
    }
};

const crearProducto = async (req, res) => {
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
        res.redirect('/admin/dashboard?success=Producto creado correctamente');
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.redirect('/admin/agregar-producto?error=' + encodeURIComponent(error.message));
    }
};

const actualizarProducto = async (req, res) => {
    try {  
        const { title, id_category, color, price, stock, status } = req.body;
        const attributes = req.body.attributes || {};
        const producto = await Product.findByPk(req.params.id);
        if (!producto) return res.redirect('/admin/dashboard?error=Producto no encontrado');

        const updateData = {
            title,
            id_category: parseInt(id_category),
            color,
            price: parseFloat(price),
            stock: parseInt(stock),
            status: status === 'on',
            attributes: JSON.stringify(attributes)
        };
        if (req.file) updateData.image_url = `/assets/img/${req.file.filename}`;
        await producto.update(updateData);
        res.redirect('/admin/dashboard?success=Producto actualizado correctamente');
    } catch (error) {
        console.error('Error al actualizar:', error);
        res.redirect(`/admin/editar-producto/${req.params.id}?error=${encodeURIComponent('Error al actualizar')}`);
    }
};

const desactivarProducto = async (req, res) => {
    try {
        const producto = await Product.findByPk(req.params.id);
        if (producto) await producto.update({ status: false });
        res.redirect('/admin/dashboard?success=Producto desactivado correctamente');
    } catch (error) {
        console.error('Error al desactivar:', error);
        res.redirect('/admin/dashboard?error=Error al desactivar el producto');
    }
};

const activarProducto = async (req, res) => {
    try {
        const producto = await Product.findByPk(req.params.id);
        if (producto) await producto.update({ status: true });
        res.redirect('/admin/dashboard?success=Producto activado correctamente');
    } catch (error) {
        console.error('Error al activar:', error);
        res.redirect('/admin/dashboard?error=Error al activar el producto');
    }
};

module.exports = {
    dashboard,
    agregarProductoForm,
    editarProductoForm,
    crearProducto,
    actualizarProducto,
    desactivarProducto,
    activarProducto
};