const BookController = require('../controllers/BookController');
const permission = require('../middleware/authorization/index');
const BookRule = require('../middleware/authorization/rules/Book');
const GlobalRule = require('../middleware/authorization/rules/Global');
const Book = require('../models/Book');
const Roles = require('../config/roles');
const express = require('express');

const router = express.Router();

router.route('/')
    .get(BookController.getBooks)
    .post(
        permission.rule(GlobalRule.updatable(Book.notUpdatable),Roles.GLOBAL_ROLES.SUPER_ADMIN),
        BookController.createBook
    );
router.route('/:id')
    .get(BookController.getBookById)
    .put(
        permission.rule(GlobalRule.updatable(Book.notUpdatable),Roles.GLOBAL_ROLES.SUPER_ADMIN),
        permission.rule(BookRule.updateBook,Roles.GLOBAL_ROLES.SUPER_ADMIN),
        BookController.updateBook
    )
    .delete(
        permission.rule(BookRule.updateBook,Roles.GLOBAL_ROLES.SUPER_ADMIN),
        BookController.removeBook);
module.exports = router;
