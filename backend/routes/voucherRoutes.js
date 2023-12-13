const express = require('express');
const router = express.Router();
const voucherController = require('../controller/voucherController');
const tokenCheck = require('../middlewares/tokenCheck');
const emailSending = require('../utils/emailUtils');
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const { apiLimiter } = require('../middlewares/rateLimite');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary= require('cloudinary').v2;
const path = require('path');

const storage= new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'discounts'
    }
})
const upload = multer({
    storage: storage
})

router.get('/get-all-voucher', voucherController.getAllVoucher);
// router.get('/get-product/:vid', voucherController.getProductByVoucherId);
router.get('/get-voucher/:vid', voucherController.getVoucherById);
router.get('/get-voucher-by-name/', voucherController.getVoucherByName);
router.get('/get-product-for-voucher/', tokenCheck.checkJWT, tokenCheck.isAdmin, voucherController.getProductForVoucher);
router.get('/get-product-of-voucher/:vid', voucherController.getProductOfVoucher);
router.put('/add-product-to-voucher/:vid', tokenCheck.checkJWT, tokenCheck.isAdmin, voucherController.addProductToVoucher);
router.put('/remove-product-from-voucher/:pid', tokenCheck.checkJWT, tokenCheck.isAdmin, voucherController.removeProductFromVoucher);
router.put('/reset-all-discount', tokenCheck.checkJWT, tokenCheck.isAdmin, voucherController.checkAndRemoveExpired);
router.delete('/remove-all-product-from-voucher/:vid', tokenCheck.checkJWT, tokenCheck.isAdmin, voucherController.removeAllProductFromVoucher);

router.put('/update-voucher/:vid', tokenCheck.checkJWT, tokenCheck.isAdmin, voucherController.updateVoucher);
router.delete('/delete-voucher/:vid', tokenCheck.checkJWT, tokenCheck.isAdmin, voucherController.deleteVoucher);
router.post('/add-new-voucher', upload.single('file'), tokenCheck.checkJWT, tokenCheck.isAdmin, voucherController.createVoucher);

//notice chosen voucher to all user 
router.post('/notice-voucher-to-all', tokenCheck.checkJWT, tokenCheck.isAdmin, emailSending.sendVoucherMail);
module.exports = router;