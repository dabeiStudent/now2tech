const express = require('express');
const router = express.Router();
const commentController = require('../controller/commentController');
const tokenCheck = require('../middlewares/tokenCheck');
const getData = require('../middlewares/getJWTData');
const cookieParser = require('cookie-parser');
router.use(cookieParser());

router.post('/create-comment/:pid', commentController.addComment);
router.post('/reply-comment/:cmtid', commentController.replyComment);
router.get('/get-comments/:pid', commentController.getCommentByProductId);
router.post('/logged-create-comment/:pid', tokenCheck.checkJWT, getData.getData, commentController.loggedComment);
router.post('/logged-reply-comment/:cmtid', tokenCheck.checkJWT, getData.getData, commentController.loggedReplyComment);
router.delete('/remove-comment/:cid', tokenCheck.checkJWT, getData.getData, commentController.removeComment);
module.exports = router;
