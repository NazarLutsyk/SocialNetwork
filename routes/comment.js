const CommentController = require('../controllers/CommentController');
const express = require('express');

const router = express.Router();

router.route('/')
    .get(CommentController.getComments)
    .post(CommentController.createComment);
router.route('/:id')
    .get(CommentController.getCommentById)
    .delete(CommentController.removeComment);
module.exports = router;
