const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
//get all
router.get('/get-all-product', productController.getAllProduct);
//get one
router.get('/get-product/:pid', productController.getOneProduct);
//add new product
router.post('/add-new-product', productController.addNewProduct);
router.post('/add-specs/:pid', productController.addSpecs4Product);
//update product
router.put('/update-product/:pid', productController.updateProduct);
router.put('/update-product/specs/:pid', productController.updateSpecs);
//remove product
router.delete('/remove-product/:pid', productController.removeProduct);
module.exports = router;