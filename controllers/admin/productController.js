const { ProductItem, ProductCategory, Order } = require('../../models/index.js');

const dashboard = async (req, res) => {
    try {
        const productos = await ProductItem.findAll(
            {
                include:
                {
                    model: ProductCategory,
                    as: 'category',
                }
            }
        );

        const productosActivos = productos.filter(p => p.status === true);
        const categorias = await ProductCategory.findAll();
        
        const ventas = await Order.findAll({ order: [['date', 'DESC']], limit: 10 });
        const totalVentas = ventas.length;
        const ingresosTotales = ventas.reduce((sum, venta) => parseFloat(sum) + parseFloat(venta.total), 0);
        const stockTotal = productosActivos.reduce((sum, producto) => sum + producto.stock, 0);

        res.render('admin/dashboard/dashboard.ejs', {
            productos,
            ventas,
            categorias,
            estadisticas: { productosActivos: productosActivos.length, totalVentas, ingresosTotales, stockTotal },
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
        const categorias = await ProductCategory.findAll();
        res.render('admin/product/new.ejs', {
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
        const producto = await ProductItem.findByPk(req.params.id);
        if (!producto) return res.status(404).send('Producto no encontrado');
        const categorias = await ProductCategory.findAll();
        res.render('admin/product/edit.ejs', {
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
        const nuevoProducto = await ProductItem.create({
            title,
            id_category: parseInt(id_category),
            color,
            price: parseFloat(price),
            stock: parseInt(stock),
            status: status === 'on',
            attributes: JSON.stringify(attributes),
            image_url: req.file ? `/assets/img/${req.file.filename}` : '/assets/img/placeholder.jpg'
        });
        res.redirect('/admin/dashboardsuccess=Producto creado correctamente');
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.redirect('/admin/productY/new.ejs?error=' + encodeURIComponent(error.message));
    }
};

const actualizarProducto = async (req, res) => {
    try {  
        const { title, id_category, color, price, stock, status } = req.body;
        const attributes = req.body.attributes || {};
        const producto = await ProductItem.findByPk(req.params.id);
        if (!producto) return res.redirect('/admin/dashboarderror=Producto no encontrado');

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
        res.redirect('/admin/dashboardsuccess=Producto actualizado correctamente');
    } catch (error) {
        console.error('Error al actualizar:', error);
        res.redirect(`/admin/product/edit.ejs/${req.params.id}?error=${encodeURIComponent('Error al actualizar')}`);
    }
};

const desactivarProducto = async (req, res) => {
    try {
        const producto = await ProductItem.findByPk(req.params.id);
        if (producto) await producto.update({ status: false });
        res.redirect('/admin/dashboardsuccess=Producto desactivado correctamente');
    } catch (error) {
        console.error('Error al desactivar:', error);
        res.redirect('/admin/dashboarderror=Error al desactivar el producto');
    }
};

const activarProducto = async (req, res) => {
    try {
        const producto = await ProductItem.findByPk(req.params.id);
        if (producto) await producto.update({ status: true });
        res.redirect('/admin/dashboardsuccess=Producto activado correctamente');
    } catch (error) {
        console.error('Error al activar:', error);
        res.redirect('/admin/dashboarderror=Error al activar el producto');
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