const { Product, Category, Order, OrderProduct } = require('../../models');

const getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { rows: productos, count } = await Product.findAndCountAll({
            include: [Category],
            limit,
            offset,
            order: [['id', 'ASC']]
        });

        res.json({
            productos,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            total: count
        });S
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const producto = await Product.findByPk(req.params.id, { include: [Category] });
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const nuevoProducto = await Product.create({
            ...req.body,
            image_url: req.file ? `/assets/img/${req.file.filename}` : null
        });
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const [updated] = await Product.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedProduct = await Product.findByPk(req.params.id);
            return res.json(updatedProduct);
        }
        res.status(404).json({ error: 'Producto no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const deleted = await Product.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            return res.status(204).end();
        }
        res.status(404).json({ error: 'Producto no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deactivateProduct = async (req, res) => {
    try {
        const [updated] = await Product.update({ status: false }, {
            where: { id: req.params.id }
        });
        if (updated) {
            return res.json({ message: 'Producto desactivado correctamente' });
        }
        res.status(404).json({ error: 'Producto no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getOrdersWithProducts = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [{
                model: Product,
                through: { attributes: ['quantity', 'price'] }
            }],
            order: [['date', 'DESC']]
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    deactivateProduct,
    getOrdersWithProducts
};