const express = require('express');
const { login, logout } = require('../../controllers/admin/authController');
const { dashboard, agregarProductoForm, editarProductoForm, crearProducto, actualizarProducto, desactivarProducto, activarProducto } = require('../../controllers/admin/productController');
const requireAuth = require('../../middleware/authViews');
const upload = require('../../middleware/upload'); 
const router = express.Router();

router.get('/login', function(req, res)
{
    if(req.session.user)
        return res.redirect('/admin/dashboard/dashboard.ejs');
    
    res.render('admin/login/login.ejs',
    {
        error: req.query.error,
        testUser: 'admin',
        testPass: 'ClaveSecreta'
    });
});

router.post('/login', login);

router.get('/logout', logout);
router.get('/dashboard', requireAuth, dashboard);
router.get('/product/new', requireAuth, agregarProductoForm);
router.get('/product/edit/:id', requireAuth, editarProductoForm);

router.post('/productos/crear', requireAuth, upload.single('imagen'), crearProducto);
router.post('/productos/actualizar/:id', requireAuth, upload.single('imagen'), actualizarProducto);
router.get('/productos/desactivar/:id', requireAuth, desactivarProducto);
router.get('/productos/activar/:id', requireAuth, activarProducto);

module.exports = router;