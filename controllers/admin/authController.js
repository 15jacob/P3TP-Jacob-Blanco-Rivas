const { User } = require('../../models/user');

const loginForm = (req, res) => {
    if (req.session.user) {
        return res.redirect('/admin/dashboard');
    }
    res.render('admin/login', { 
        title: 'Login - Cap&Sock',
        error: req.query.error 
    });
};

const login = async (req, res) => {
    try {
        const { user, password } = req.body;
        const adminUser = await User.findOne({ where: { user } });

        if (adminUser && adminUser.password === password) {
            req.session.user = {
                id: adminUser.id,
                username: adminUser.user,
                nombre: 'Administrador',
                role: 'admin'
            };
            return res.redirect('/admin/dashboard');
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

module.exports = { loginForm, login, logout };