const express = require('express');
const router = express.Router();
const voucherController = require('../controller/voucherController');
const emailSending = require('../utils/emailUtils');

router.get('/get-all-voucher', voucherController.getAllVoucher);
router.get('/get-product/:vid', voucherController.getProductByVoucherId);
router.post('/add-new-voucher', voucherController.createVoucher);
router.put('/add-product-to-voucher/:vid', voucherController.addProductToVoucher);

//notice chosen voucher to all user 
router.post('/notice-voucher-to-all', emailSending.sendVoucherMail);
module.exports = router;