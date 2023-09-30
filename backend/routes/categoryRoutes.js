const express= require('express');
const router= express.Router();

const categoryController= require('../controller/categoryController');

router.post('/add-new-category', categoryController.addCategory);

module.exports= router;