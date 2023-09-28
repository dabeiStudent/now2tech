const express= require('express');
const router= express.Router();
const voucherController= require('../controller/voucherController');

router.post('/', voucherController.createVoucher);
router.put('/addProduct', voucherController.addProductToVoucher);

module.exports= router;