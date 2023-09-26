const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const tokenCheck = require('../middlewares/tokenCheck');
const getJWT = require('../middlewares/getJWTData');
const cookieParser = require('cookie-parser');
router.use(cookieParser());

//getAllUser
router.get('/', tokenCheck.checkJWT, tokenCheck.isAdmin, userController.getAllUser);
//getOneUser
router.get('/:uid', tokenCheck.checkJWT, tokenCheck.isAdmin, userController.getUser);
//login
router.post('/user-login', userController.userLogin);
//register
router.post('/user-register', userController.userRegister);
//updateUser
router.put('/user-update/:uid', tokenCheck.checkJWT, userController.updateUser);
//changePassword (only for user)
router.put('/user-changepassword', tokenCheck.checkJWT, getJWT.getData, userController.changePassword);
//blockUser
router.put('/user-block/:uid', tokenCheck.checkJWT, tokenCheck.isAdmin, userController.freezeUser);
router.put('/user-unblock/:uid', tokenCheck.checkJWT, tokenCheck.isAdmin, userController.freeUser);
//removeUser
router.delete('/user-remove/:uid', tokenCheck.checkJWT, tokenCheck.isAdmin, userController.removeUser);
module.exports = router;