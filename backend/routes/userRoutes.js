const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

//register
router.post('/user-register', userController.userRegister);



module.exports = router;