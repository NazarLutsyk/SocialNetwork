const ChatController = require('../controllers/ChatController');
const express = require('express');

const router = express.Router();

router.route('/')
    .get(ChatController.getChats)
    .post(ChatController.createChat);
router.route('/:id')
    .get(ChatController.getChatById)
    .put(ChatController.updateChat)
    .delete(ChatController.removeChat);
module.exports = router;
