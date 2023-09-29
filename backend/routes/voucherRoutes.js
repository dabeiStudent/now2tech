const express = require('express');
const router = express.Router();
const voucherController = require('../controller/voucherController');
const emailSending = require('../utils/emailUtils');

router.get('/get-all-voucher', voucherController.getAllVoucher);
router.get('/get-product/:vid', voucherController.getProductByVoucherId);
router.get('/get-voucher/:vid', voucherController.getVoucherById);
router.post('/add-new-voucher', voucherController.createVoucher);
router.put('/add-product-to-voucher/:vid', voucherController.addProductToVoucher);
router.put('/remove-product-from-voucher/:vid', voucherController.removeProductFromVoucher);
router.put('/update-voucher/:vid', voucherController.updateVoucher);
router.delete('/delete-voucher/:vid', voucherController.deleteVoucher);

//notice chosen voucher to all user 
router.post('/notice-voucher-to-all', emailSending.sendVoucherMail);
module.exports = router;