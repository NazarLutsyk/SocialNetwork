const PostController = require('../controllers/PostController');
const permission = require('../middleware/authorization/index');
const PostRule = require('../middleware/authorization/rules/Post');
const Roles = require('../config/roles');
const express = require('express');

const router = express.Router();

router.route('/')
    .get(PostController.getPosts)
    .post(PostController.createPost);
router.route('/:id')
    .get(PostController.getPostById)
    .put(
        permission.rule(PostRule.updatePost,Roles.GLOBAL_ROLES.SUPER_ADMIN),
        PostController.updatePost
    )
    .delete(
        permission.rule(PostRule.updatePost,Roles.GLOBAL_ROLES.SUPER_ADMIN),
        PostController.removePost
    );
module.exports = router;
