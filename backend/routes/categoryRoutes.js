const express = require('express');
const router = express.Router();
const tokenCheck = require('../middlewares/tokenCheck');
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const categoryController = require('../controller/categoryController');

router.post('/add-new-category', tokenCheck.checkJWT, tokenCheck.isAdmin, categoryController.addCategory);
router.get('/get-sub-category/:cid', categoryController.getSubCategory);
router.get('/get-main-category', categoryController.getMainCategory);
router.put('/update-category/:cid', tokenCheck.checkJWT, tokenCheck.isAdmin, categoryController.updateCategory);
router.delete('/delete-category/:cid', tokenCheck.checkJWT, tokenCheck.isAdmin, categoryController.deleteCategory);

module.exports = router;