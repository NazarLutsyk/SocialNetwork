let router = require('express').Router();
let queryParser = require('../middleware/query');

router.use(queryParser.parseQuery);

router.use('/books',require('./book'));
router.use('/chats',require('./chat'));
router.use('/comments',require('./comment'));
router.use('/galleries',require('./gallery'));
router.use('/images',require('./image'));
router.use('/libraries',require('./library'));
router.use('/messages',require('./message'));
router.use('/posts',require('./post'));
router.use('/ratings',require('./rating'));
router.use('/users',require('./user'));
router.use('/walls',require('./wall'));

module.exports = router;