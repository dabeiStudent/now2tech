const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const tokenCheck = require('../middlewares/tokenCheck');
const cookieParser = require('cookie-parser');
router.use(cookieParser());

//get all
router.get('/get-all-product', productController.getAllProduct);
//get one
router.get('/get-product/:pid', productController.getOneProduct);
//add new product
router.post('/add-new-product', tokenCheck.checkJWT, tokenCheck.isAdmin, productController.addNewProduct);
router.post('/add-specs/:pid', tokenCheck.checkJWT, tokenCheck.isAdmin, productController.addSpecs4Product);
//update product
router.put('/update-product/:pid', tokenCheck.checkJWT, tokenCheck.isAdmin, productController.updateProduct);
router.put('/update-product/specs/:pid', tokenCheck.checkJWT, tokenCheck.isAdmin, productController.updateSpecs);
//remove product
router.delete('/remove-product/:pid', tokenCheck.checkJWT, tokenCheck.isAdmin, productController.removeProduct);
module.exports = router;