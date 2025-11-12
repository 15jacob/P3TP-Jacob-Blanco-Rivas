const express = require('express');
const router = express.Router();
const multer = require('multer');
const { 
  dashboard, 
  agregarProductoForm, 
  editarProductoForm, 
  crearProducto, 
  actualizarProducto, 
  desactivarProducto, 
  activarProducto 
} = require('../../controllers/admin/productController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/assets/img/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.get('/dashboard', dashboard);
router.get('/agregar-producto', agregarProductoForm);
router.get('/editar-producto/:id', editarProductoForm);
router.post('/productos/crear', upload.single('imagen'), crearProducto);
router.post('/productos/actualizar/:id', upload.single('imagen'), actualizarProducto);
router.get('/productos/eliminar/:id', desactivarProducto);
router.get('/productos/activar/:id', activarProducto);

module.exports = router;