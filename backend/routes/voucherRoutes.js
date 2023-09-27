const express= require('express');
const router= express.Router();
const voucherController= require('../controller/voucherController');

router.post('/', voucherController.createVoucher);
router.post('/addProduct', voucherController.addProductForVoucher);

module.exports= router;