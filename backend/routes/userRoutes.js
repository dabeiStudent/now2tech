const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

//login
router.post('/user-login', userController.userLogin);
//register
router.post('/user-register', userController.userRegister);



module.exports = router;