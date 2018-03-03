const PostController = require('../controllers/PostController');
const express = require('express');

const router = express.Router();

router.route('/')
    .get(PostController.getPosts)
    .post(PostController.createPost);
router.route('/:id')
    .get(PostController.getPostById)
    .put(PostController.updatePost)
    .delete(PostController.removePost);
module.exports = router;
