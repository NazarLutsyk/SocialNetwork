let Book = require('../models/Book');
let Library = require('../models/Library');
let keysValidator = require('../validators/keysValidator');

module.exports = {
    async getBooks(req, res) {
        try {
            let bookQuery;
            if (req.query.aggregate) {
                bookQuery = Book.aggregate(req.query.aggregate);
            } else {
                bookQuery = Book
                    .find(req.query.query)
                    .sort(req.query.sort)
                    .select(req.query.fields)
                    .skip(req.query.skip)
                    .limit(req.query.limit);
                if (req.query.populate) {
                    for (let populateField of req.query.populate) {
                        bookQuery.populate(populateField);
                    }
                }
            }
            let books = await bookQuery.exec();
            res.json(books);
        } catch (e) {
            res.status(404).send(e.toString());
        }
    },
    async getBookById(req, res) {
        let bookId = req.params.id;
        try {
            let bookQuery = Book.findOne({_id: bookId})
                .select(req.query.fields);
            if (req.query.populate) {
                for (let populateField of req.query.populate) {
                    bookQuery.populate(populateField);
                }
            }
            let book = await bookQuery.exec();
            res.json(book);
        } catch (e) {
            res.status(404).send(e.toString());
        }
    },
    async createBook(req, res) {
        try {
            let err = keysValidator.diff(Book.schema.tree, req.body);
            if (err) {
                throw new Error('Unknown fields ' + err);
            } else {
                //todo upload
                req.body.author = await Library.findOne({author: req.user._id});
                let book = new Book(req.body);
                book = await book.supersave();
                res.status(201).json(book);
            }
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async updateBook(req, res) {
        let bookId = req.params.id;
        try {
            let err = keysValidator.diff(Book.schema.tree, req.body);
            if (err){
                throw new Error('Unknown fields ' + err);
            } else {
                let book = await Book.findById(bookId);
                if (book && req.body) {
                    let updated = await book.superupdate(req.body);
                    res.status(201).json(updated);
                }else {
                    res.sendStatus(404);
                }
            }
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async removeBook(req, res) {
        let bookId = req.params.id;
        try {
            let book = await Book.findById(bookId);
            book = await book.remove();
            res.status(204).json(book);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    }
};