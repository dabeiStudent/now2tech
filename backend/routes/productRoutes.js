const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
//get all
router.get('/get-all-product', productController.getAllProduct);
//get one
//add new product
router.post('/add-new-product', productController.addNewProduct);
router.post('/add-new-product_type', productController.addNewProductType);

module.exports = router;