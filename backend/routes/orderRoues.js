const router = require('express').Router();
const orderController = require('../controller/orderController');
const tokenCheck = require('../middlewares/tokenCheck');
const getData = require('../middlewares/getJWTData');
const cookieParser = require('cookie-parser');
router.use(cookieParser());

//getOrder
router.get('/all-order', tokenCheck.checkJWT, tokenCheck.isAdmin, orderController.getAllOrder);
router.get('/my-order', tokenCheck.checkJWT, getData.getData, orderController.getMyOrder);
//createOrder
router.post('/create-order', orderController.createOrder);
//updateToPaid
router.put('/update-to-paid/:oid', tokenCheck.checkJWT, orderController.updateToPaid);
router.put('/update-to-delivered/:oid', tokenCheck.checkJWT, orderController.updateToDelivered);



module.exports = router;