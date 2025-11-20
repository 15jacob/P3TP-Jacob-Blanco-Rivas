const express = require('express');
const { getHomePage } = require('../controllers/storeController');
const router = express.Router();

router.get('/home', getHomePage);
router.get('/home/page=:page', getHomePage);
router.get('/home/id=:id/page=:page', getHomePage);

module.exports = router;