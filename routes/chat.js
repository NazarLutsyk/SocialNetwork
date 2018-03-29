const ChatController = require('../controllers/ChatController');
const permission = require('../middleware/authorization/index');
const ChatRule = require('../middleware/authorization/rules/Chat');
const Roles = require('../config/roles');
const express = require('express');

const router = express.Router();

router.route('/')
    .get(ChatController.getChats)
    .post(ChatController.createChat);
router.route('/:id')
    .get(ChatController.getChatById)
    .put(
        permission.rule(ChatRule.updateChat,Roles.GLOBAL_ROLES.SUPER_ADMIN),
        ChatController.updateChat
    );
module.exports = router;
