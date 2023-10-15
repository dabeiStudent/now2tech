const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const tokenCheck = require('../middlewares/tokenCheck');
const cookieParser = require('cookie-parser');
router.use(cookieParser());

//get all
router.get('/get-all-product', productController.getProduct);
router.get('/get-all-admin', tokenCheck.checkJWT, tokenCheck.isAdmin, productController.getProductAdmin);
//get one
router.get('/get-product/:pid', productController.getOneProduct);
//get product by brand & category
router.get('/get-product-by', productController.getProduct);
router.get('/get-product-by-price', productController.getProduct);
//add new product
router.post('/add-new-product', tokenCheck.checkJWT, tokenCheck.isAdmin, productController.addNewProduct);
router.post('/add-specs/:pid', tokenCheck.checkJWT, tokenCheck.isAdmin, productController.addSpecs4Product);
//update product
router.put('/update-product/:pid', tokenCheck.checkJWT, tokenCheck.isAdmin, productController.updateProduct);
router.put('/update-product/specs/:pid', tokenCheck.checkJWT, tokenCheck.isAdmin, productController.updateSpecs);
//remove product
router.delete('/remove-product/:pid', tokenCheck.checkJWT, tokenCheck.isAdmin, productController.removeProduct);
module.exports = router;