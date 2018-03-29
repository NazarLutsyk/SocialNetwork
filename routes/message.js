const MessageController = require('../controllers/MessageController');
const permission = require('../middleware/authorization/index');
const MessageRule = require('../middleware/authorization/rules/Message');
const express = require('express');

const router = express.Router();

router.route('/')
    .get(MessageController.getMessages)
    .post(MessageController.createMessage);
router.route('/:id')
    .get(MessageController.getMessageById)
    .delete(
        permission.rule(MessageRule.updateMessage),
        MessageController.removeMessage
    );
module.exports = router;
