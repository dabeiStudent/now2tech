const router = require('express').Router();
const orderController = require('../controller/orderController');
const tokenCheck = require('../middlewares/tokenCheck');
const getData = require('../middlewares/getJWTData');
const emailUtil = require('../utils/emailUtils');
const cookieParser = require('cookie-parser');
router.use(cookieParser());

//getOrder
router.get('/all-order', tokenCheck.checkJWT, tokenCheck.isAdmin, orderController.getAllOrder);
router.get('/my-order', tokenCheck.checkJWT, getData.getData, orderController.getMyOrder);
router.get('/get-order/:oid', tokenCheck.checkJWT, getData.getData, orderController.getOrderById);
router.get('/vnpay-ipn/:oid', orderController.vnpayIPN);
//createOrder
router.post('/create-order', tokenCheck.checkJWT, getData.getData, orderController.createOrder);
router.post('/create-vnpay-url/:oid', orderController.createVNPayUrl);
//updateToPaid
router.put('/update-to-paid/:oid', tokenCheck.checkJWT, orderController.updateToPaid);
router.put('/update-to-delivered/:oid', tokenCheck.checkJWT, getData.getData, orderController.updateToDelivered);
router.put('/cancel-order/:oid', tokenCheck.checkJWT, getData.getData, orderController.cancelOrder);
//updateStatusAdmin
router.put('/update-status/:oid/:ostatus', tokenCheck.checkJWT, tokenCheck.isAdmin, orderController.updateStatusOrderAdmin);
router.put('/update-status-shipped/:oid/:ostatus', tokenCheck.checkJWT, tokenCheck.isAdmin, orderController.updateInstockAfterSent);
router.get('/config/paypal', orderController.getPaypalClientId);

//
module.exports = router;