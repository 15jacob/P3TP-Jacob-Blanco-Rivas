const express = require('express');
const { viewLogin, viewHome, viewCart, viewTicket, downloadTicket, getCartProducts, createOrder } = require('../controllers/client/storeController.js');

const router = express.Router();

router.get('/', viewLogin);

router.get('/home', viewHome);
router.get('/home/page=:page', viewHome);
router.get('/home/id=:id/page=:page', viewHome);

router.get('/cart', viewCart);
router.post('/cart/products', getCartProducts);
router.post('/cart/confirm-order', createOrder);

router.get('/ticket/id=:id', viewTicket);

//Testing con GET, pasar mas tarde a POST
//router.post('/ticket/pdf', downloadTicket);
router.get('/ticket/pdf/id=:id', downloadTicket);

module.exports = router;