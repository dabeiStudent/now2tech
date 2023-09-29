const express = require('express');
const router = express.Router();
const voucherController = require('../controller/voucherController');
const tokenCheck = require('../middlewares/tokenCheck');
const emailSending = require('../utils/emailUtils');
const cookieParser = require('cookie-parser');
router.use(cookieParser());

router.get('/get-all-voucher', voucherController.getAllVoucher);
router.get('/get-product/:vid', voucherController.getProductByVoucherId);
router.get('/get-voucher/:vid', voucherController.getVoucherById);
// router.post('/add-new-voucher', voucherController.createVoucher);
router.put('/add-product-to-voucher/:vid', tokenCheck.checkJWT, tokenCheck.isAdmin, voucherController.addProductToVoucher);
router.put('/remove-product-from-voucher/:vid', tokenCheck.checkJWT, tokenCheck.isAdmin, voucherController.removeProductFromVoucher);
router.put('/update-voucher/:vid', tokenCheck.checkJWT, tokenCheck.isAdmin, voucherController.updateVoucher);
router.delete('/delete-voucher/:vid', tokenCheck.checkJWT, tokenCheck.isAdmin, voucherController.deleteVoucher);
router.post('/add-new-voucher', tokenCheck.checkJWT, tokenCheck.isAdmin, voucherController.createVoucher);
// router.put('/addProduct', tokenCheck.checkJWT, tokenCheck.isAdmin, voucherController.addProductToVoucher);

//notice chosen voucher to all user 
router.post('/notice-voucher-to-all', tokenCheck.checkJWT, tokenCheck.isAdmin, emailSending.sendVoucherMail);
module.exports = router;