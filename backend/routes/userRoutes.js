const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const tokenCheck = require('../middlewares/tokenCheck');
const getJWT = require('../middlewares/getJWTData');
const emailSending = require('../utils/emailUtils');
const cookieParser = require('cookie-parser');
router.use(cookieParser());

//getAllUser
router.get('/get-user/', tokenCheck.checkJWT, tokenCheck.isAdmin, userController.getAllUser);
//getOneUser
router.get('/get-user/:uid', tokenCheck.checkJWT, tokenCheck.isAdmin, userController.getUser);
//getProfile (user signed in)
router.get('/profile/my-profile', tokenCheck.checkJWT, getJWT.getData, userController.getProfile);
//login & logout
router.post('/user-login', userController.userLogin);
router.post('/user-logout', tokenCheck.checkJWT, userController.userLogout);
//resetPassword
router.post('/reset-password/send-request', emailSending.sendEmailReset);
router.get('/reset-password/check-token', emailSending.resetPassword);
//register
router.post('/user-register', userController.userRegister);
//updateUser
router.put('/user-update/:uid', tokenCheck.checkJWT, tokenCheck.isAdmin, userController.updateUser);
//updateProfile (user signed in)
router.put('/profile/update', tokenCheck.checkJWT, getJWT.getData, userController.updateProfile);
//changePassword (only for user)
router.put('/user-changepassword', tokenCheck.checkJWT, getJWT.getData, userController.changePassword);
//blockUser & unblockAccount
router.put('/user-status/:uid/:status', tokenCheck.checkJWT, tokenCheck.isAdmin, userController.setStatus);
//removeUser
router.delete('/user-remove/:uid', tokenCheck.checkJWT, tokenCheck.isAdmin, userController.removeUser);
module.exports = router;