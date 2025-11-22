const express = require('express');
const router = express.Router();
const { register } = require('../../controllers/admin/authController');
const { 
    getAllProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct, 
    deactivateProduct,
    getOrdersWithProducts 
} = require('../../controllers/admin/apiProductController');
const { validateProduct, validateUser } = require('../../middleware/validate');
const upload = require('../../middleware/upload');
const authApi = require('../../middleware/authApi');

router.post('/api/register', validateUser, register);

router.get('/api/products', authApi, getAllProducts);
router.get('/api/products/:id', authApi, getProductById);
router.post('/api/products', authApi, upload.single('imagen'), validateProduct, createProduct);
router.put('/api/products/:id', authApi, upload.single('imagen'), updateProduct);
router.delete('/api/products/:id', authApi, deleteProduct);
router.patch('/api/products/:id/desactivar', authApi, deactivateProduct);
router.get('/api/orders', authApi, getOrdersWithProducts);

module.exports = router;