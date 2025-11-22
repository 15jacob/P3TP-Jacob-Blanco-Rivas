const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');
const secret = process.env.JWT_SECRET || 'secret'; 

const register = async (req, res) => {
    try {
        const { user, password } = req.body;
        if (!user || !password) {
            return res.status(400).json({ error: 'Usuario y contraseña son obligatorios.' });
        }
        if (password.length < 8) {
            return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres.' });
        }

        const newUser = await User.create({ user, password });

        const token = jwt.sign(
            { id: newUser.id, user: newUser.user },
            secret,
            { expiresIn: '8h' }
        );

        res.status(201).json({ message: 'Usuario creado', user: { id: newUser.id, user: newUser.user }, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { user, password } = req.body; //
        const adminUser = await User.findOne({ where: { user } });

        if (adminUser && await adminUser.validatePassword(password)) {
            req.session.user = {
                id: adminUser.id,
                username: adminUser.user,
                nombre: 'Administrador',
                role: 'admin'
            };
            return res.redirect('/admin/dashboard/');
        }
        
        res.redirect('/admin/login?error=Credenciales incorrectas');
    } catch (error) {
        console.error('Error en login:', error);
        res.redirect('/admin/login?error=Error interno del servidor');
    }
};

const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
};

module.exports = { register, login, logout };