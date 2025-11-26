const express = require('express');
const { viewLogin, viewHome, viewCart, viewTicket, getCartProducts } = require('../controllers/storeController');

const router = express.Router();

router.get('/', viewLogin);

router.get('/home', viewHome);
router.get('/home/page=:page', viewHome);
router.get('/home/id=:id/page=:page', viewHome);

router.get('/cart', viewCart);
router.post('/cart/products', getCartProducts);

router.get('/ticket', viewTicket);

module.exports = router;