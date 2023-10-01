const express= require('express');
const router= express.Router();

const categoryController= require('../controller/categoryController');

router.post('/add-new-category', categoryController.addCategory);
router.get('/get-sub-category/:cid', categoryController.getSubCategory);
router.get('/get-main-category', categoryController.getMainCategory);
router.put('/update-category/:cid', categoryController.updateCategory);
router.delete('/delete-category/:cid', categoryController.deleteCategory);

module.exports= router;