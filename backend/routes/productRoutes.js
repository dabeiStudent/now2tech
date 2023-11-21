const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const tokenCheck = require('../middlewares/tokenCheck');
const cookieParser = require('cookie-parser');
const getData = require('../middlewares/getJWTData');
router.use(cookieParser());
const multer = require('multer');
const path = require('path');
//setup multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'backend/public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})
//get all
router.get('/get-all-product', productController.getProduct);
router.get('/get-all-admin', tokenCheck.checkJWT, tokenCheck.isAdmin, productController.getProductAdmin);
router.get('/get-good-product', productController.getGoodProduct);
//get one
router.get('/get-product/:pid', productController.getOneProduct);
//get product by brand & category
router.get('/get-product-by', productController.getProduct);
router.get('/get-product-by-price', productController.getProduct);
//add new product
router.post('/add-new-product', tokenCheck.checkJWT, tokenCheck.isAdmin, productController.addNewProduct);
router.post('/add-specs/:pid', tokenCheck.checkJWT, tokenCheck.isAdmin, productController.addSpecs4Product);
//update product
router.put('/upload-image-product/:pid', upload.array("files"), tokenCheck.checkJWT, tokenCheck.isAdmin, productController.addImagesProduct);
router.put('/update-product/:pid', tokenCheck.checkJWT, tokenCheck.isAdmin, productController.updateProduct);
router.put('/update-product/specs/:pid', tokenCheck.checkJWT, tokenCheck.isAdmin, productController.updateSpecs);
//remove product
router.delete('/remove-product/:pid', tokenCheck.checkJWT, tokenCheck.isAdmin, productController.removeProduct);
//add review
router.post('/add-review/:pid', tokenCheck.checkJWT, getData.getData, productController.addReview);
module.exports = router;