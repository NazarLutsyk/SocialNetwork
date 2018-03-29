const CommentController = require('../controllers/CommentController');
const permission = require('../middleware/authorization/index');
const CommentRule = require('../middleware/authorization/rules/Comment');
const Roles = require('../config/roles');
const express = require('express');

const router = express.Router();

router.route('/')
    .get(CommentController.getComments)
    .post(CommentController.createComment);
router.route('/:id')
    .get(CommentController.getCommentById)
    .delete(
        permission.rule(CommentRule.updateComment,Roles.GLOBAL_ROLES.SUPER_ADMIN),
        CommentController.removeComment
    );
module.exports = router;
