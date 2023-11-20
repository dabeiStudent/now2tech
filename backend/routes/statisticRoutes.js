const express= require('express')
const router= express.Router();
const tokenCheck = require('../middlewares/tokenCheck');
const cookieParser = require('cookie-parser');
const statisticController= require('../controller/statisticController');
router.use(cookieParser());


router.get('/get-statistic', tokenCheck.checkJWT, tokenCheck.isAdmin, statisticController.getStatistic);
router.get('/user-statistic', tokenCheck.checkJWT, tokenCheck.isAdmin, statisticController.getUserStats);
router.get('/sales-statistic', tokenCheck.checkJWT, tokenCheck.isAdmin, statisticController.getSalesStats);


module.exports = router;