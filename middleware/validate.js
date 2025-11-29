const validateProduct = (req, res, next) => {
    const { title, id_category, price, stock } = req.body;

    if (!title || !id_category || !price || !stock) {
        if (req.originalUrl.includes('/api/')) {
            return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes.' });
        }

        req.flash('error', 'Faltan campos obligatorios.');
        return res.redirect('back');
    }

    if (isNaN(price) || isNaN(stock)) {
        if (req.originalUrl.includes('/api/')) {
            return res.status(400).json({ error: 'Precio y stock deben ser números válidos.' });
        }
        req.flash('error', 'Precio y stock deben ser números válidos.');
        return res.redirect('back');
    }

    next();
};

const validateUser = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        if (req.originalUrl.includes('/api/')) {
            return res.status(400).json({ error: 'Usuario y contraseña son obligatorios.' });
        }
        req.flash('error', 'Usuario y contraseña son obligatorios.');
        return res.redirect('back');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        if (req.originalUrl.includes('/api/')) {
            return res.status(400).json({ error: 'Formato de email inválido.' });
        }
        req.flash('error', 'Formato de email inválido.');
        return res.redirect('back');
    }

    if (password.length < 8) {
        if (req.originalUrl.includes('/api/')) {
            return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres.' });
        }
        req.flash('error', 'La contraseña debe tener al menos 8 caracteres.');
        return res.redirect('back');
    }

    next();
};

module.exports = { validateProduct, validateUser };