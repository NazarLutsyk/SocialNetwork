let Book = require('../models/Book');

module.exports = {
    async getBooks(req, res) {
        try {
            let bookQuery = Book
                .find(req.query.query)
                .sort(req.query.sort)
                .select(req.query.fields);
            if (req.query.populate) {
                for (let populateField of req.query.populate) {
                    bookQuery.populate(populateField);
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
            let book = await Book.create(req.body);
            res.status(201).json(book);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async updateBook(req, res) {
        let bookId = req.params.id;
        try {
            let book = await Book.findByIdAndUpdate(bookId, req.body,{new : true});
            res.status(201).json(book);
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