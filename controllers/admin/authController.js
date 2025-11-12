const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');
const secretKey = process.env.JWT_SECRET || 'clave_secreta';

// const loginForm = (req, res) => {
//     if (req.session.user) {
//         return res.redirect('/admin/dashboard');
//     }
//     res.render('admin/login', { 
//         title: 'Login - Cap&Sock',
//         error: req.query.error 
//     });
// };

const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Usuario y contraseña son obligatorios.' });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword });

        res.status(201).json({ message: 'Usuario creado', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: '24h' });
        res.json({ token, user: { id: user.id, username: user.username } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// const logout = (req, res) => {
//     req.session.destroy();
//     res.redirect('/admin/login');
// };

module.exports = { register, login };