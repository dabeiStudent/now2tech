const express = require('express');
const router = express.Router();
const voucherController = require('../controller/voucherController');
const tokenCheck = require('../middlewares/tokenCheck');
const emailSending = require('../utils/emailUtils');
const cookieParser = require('cookie-parser');
router.use(cookieParser());


router.post('/', tokenCheck.checkJWT, tokenCheck.isAdmin, voucherController.createVoucher);
router.put('/addProduct', tokenCheck.checkJWT, tokenCheck.isAdmin, voucherController.addProductToVoucher);

//notice chosen voucher to all user 
router.post('/notice-voucher-to-all', tokenCheck.checkJWT, tokenCheck.isAdmin, emailSending.sendVoucherMail);
module.exports = router;