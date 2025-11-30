const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');
const secret = process.env.JWT_SECRET || 'secret'; 

const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'email y contraseña son obligatorios.' });
        }
        if (password.length < 8) {
            return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres.' });
        }

        const newUser = await User.create({ email, password });

        res.status(201).json({ message: 'Usuario creado', user: { id: newUser.id, email: newUser.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (req.headers['content-type']?.includes('application/json')) {
            const adminUser = await User.findOne({ where: { email } });

            if (adminUser && await adminUser.validatePassword(password)) {
                const token = jwt.sign(
                    { id: adminUser.id, email: adminUser.email },
                    secret,
                    { expiresIn: '8h' }
                );

                return res.json({ 
                    message: 'Login exitoso', 
                    user: { id: adminUser.id, email: adminUser.email }, 
                    token 
                });
            }
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const adminUser = await User.findOne({ where: { email } });

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
        if (req.headers['content-type']?.includes('application/json')) {
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.redirect('/admin/login?error=Error interno del servidor');
    }
};

const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
};

module.exports = { register, login, logout };