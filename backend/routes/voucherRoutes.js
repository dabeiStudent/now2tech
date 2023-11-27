const express = require('express');
const router = express.Router();
const voucherController = require('../controller/voucherController');
const tokenCheck = require('../middlewares/tokenCheck');
const emailSending = require('../utils/emailUtils');
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const { apiLimiter } = require('../middlewares/rateLimite');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'backend/public/images/vouchers')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})


router.get('/get-all-voucher', voucherController.getAllVoucher);
router.get('/get-product/:vid', voucherController.getProductByVoucherId);
router.get('/get-voucher/:vid', voucherController.getVoucherById);
router.get('/get-voucher-by-name/', voucherController.getVoucherByName);
router.get('/get-product-for-voucher/', tokenCheck.checkJWT, tokenCheck.isAdmin, voucherController.getProductForVoucher);
router.get('/get-product-of-voucher/:vid', voucherController.getProductOfVoucher);
// router.post('/add-new-voucher', voucherController.createVoucher);
router.put('/add-product-to-voucher/:vid', tokenCheck.checkJWT, tokenCheck.isAdmin, voucherController.addProductToVoucher);
router.put('/remove-product-from-voucher/:pid', tokenCheck.checkJWT, tokenCheck.isAdmin, voucherController.removeProductFromVoucher);
router.put('/update-voucher/:vid', tokenCheck.checkJWT, tokenCheck.isAdmin, voucherController.updateVoucher);
router.delete('/delete-voucher/:vid', tokenCheck.checkJWT, tokenCheck.isAdmin, voucherController.deleteVoucher);
router.post('/add-new-voucher', upload.single('file'), tokenCheck.checkJWT, tokenCheck.isAdmin, voucherController.createVoucher);
// router.put('/addProduct', tokenCheck.checkJWT, tokenCheck.isAdmin, voucherController.addProductToVoucher);

//notice chosen voucher to all user 
router.post('/notice-voucher-to-all', tokenCheck.checkJWT, tokenCheck.isAdmin, emailSending.sendVoucherMail);
module.exports = router;