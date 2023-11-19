const express = require('express');
const router = express.Router();
const tokenCheck = require('../middlewares/tokenCheck');
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const categoryController = require('../controller/categoryController');

router.post('/add-category', tokenCheck.checkJWT, tokenCheck.isAdmin, categoryController.newCategory);
router.get('/get-category', categoryController.getCategory);
router.delete('/delete-category/:cid', tokenCheck.checkJWT, tokenCheck.isAdmin, categoryController.deleteCategory);

module.exports = router;