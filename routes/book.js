const BookController = require('../controllers/BookController');
const express = require('express');

const router = express.Router();

router.route('/')
    .get(BookController.getBooks)
    .post(BookController.createBook);
router.route('/:id')
    .get(BookController.getBookById)
    .put(BookController.updateBook)
    .delete(BookController.removeBook);
module.exports = router;
