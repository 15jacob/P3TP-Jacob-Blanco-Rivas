const validateProduct = (req, res, next) => {
    const { title, id_category, price, stock } = req.body;

    if (!title || !id_category || !price || !stock) {
        return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes.' });
    }

    if (isNaN(price) || isNaN(stock)) {
        return res.status(400).json({ error: 'Precio y stock deben ser números válidos.' });
    }

    next();
};

const validateUser = (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Usuario y contraseña son obligatorios.' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres.' });
    }

    next();
};

module.exports = { validateProduct, validateUser };