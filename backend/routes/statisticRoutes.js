const express= require('express')
const router= express.Router();
const statisticController= require('../controller/statisticController');

router.get('/get-statistic', statisticController.getStatistic);
router.get('/user-statistic', statisticController.getUserStats);
router.get('/sales-statistic', statisticController.getSalesStats);


module.exports= router;