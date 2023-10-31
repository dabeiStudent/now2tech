const express= require('express');
const router= express.Router();
const commentController= require('../controller/commentController');

router.post('/create-comment/:pid', commentController.addComment);
router.get('/get-comments/:pid', commentController.getCommentByProductId);

module.exports= router;
