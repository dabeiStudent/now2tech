const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const tokenCheck = require('../middlewares/tokenCheck');
const getJWT = require('../middlewares/getJWTData');
const resetPassword = require('../middlewares/resetPassword');
const cookieParser = require('cookie-parser');
router.use(cookieParser());

//getAllUser
router.get('/', tokenCheck.checkJWT, tokenCheck.isAdmin, userController.getAllUser);
//getOneUser
router.get('/:uid', tokenCheck.checkJWT, tokenCheck.isAdmin, userController.getUser);
//login & logout
router.post('/user-login', userController.userLogin);
router.post('/user-logout', tokenCheck.checkJWT, userController.userLogout);
//resetPassword
router.post('/reset-password', resetPassword.resetPassword);
//register
router.post('/user-register', userController.userRegister);
//updateUser
router.put('/user-update/:uid', tokenCheck.checkJWT, userController.updateUser);
//changePassword (only for user)
router.put('/user-changepassword', tokenCheck.checkJWT, getJWT.getData, userController.changePassword);
//blockUser & unblockAccount
router.put('/user-status/:uid/:status', tokenCheck.checkJWT, tokenCheck.isAdmin, userController.setStatus);
//removeUser
router.delete('/user-remove/:uid', tokenCheck.checkJWT, tokenCheck.isAdmin, userController.removeUser);
module.exports = router;