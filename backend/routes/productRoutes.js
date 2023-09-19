const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
//get all
//get one
//add new product
router.post('/add-new-product', productController.addNewProduct);

module.exports = router;