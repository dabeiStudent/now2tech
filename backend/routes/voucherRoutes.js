const express = require('express');
const router = express.Router();
const voucherController = require('../controller/voucherController');
const emailSending = require('../utils/emailUtils');

router.post('/', voucherController.createVoucher);
router.put('/addProduct', voucherController.addProductToVoucher);

//notice chosen voucher to all user 
router.post('/notice-voucher-to-all', emailSending.sendVoucherMail);
module.exports = router;