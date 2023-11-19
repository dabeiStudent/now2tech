const express = require('express');
const router = express.Router();
const brandController = require('../controller/brandController');
const tokenCheck = require('../middlewares/tokenCheck');
const cookieParser = require('cookie-parser');
router.use(cookieParser());

router.get('/get-brand', brandController.getBrand);
router.get('/get-brand-cate/:cname', brandController.getBrandByCate);
router.post('/add-brand', tokenCheck.checkJWT, tokenCheck.isAdmin, brandController.addBrand);
router.delete('/remove-brand/:bid', tokenCheck.checkJWT, tokenCheck.isAdmin, brandController.deleteBrand);

module.exports = router