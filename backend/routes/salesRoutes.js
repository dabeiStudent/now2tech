const express= require('express')
const router= express.Router();
const salesController= require('../controller/salesController');

router.get('/get-sale/:pid', salesController.getSaleByProductId);


module.exports= router;