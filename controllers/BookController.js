let Book = require('../models/Book');
let User = require('../models/User');
let keysValidator = require('../validators/keysValidator');
let path = require('path');
let upload =
    require('../middleware/multer')(
        path.join(__dirname, '../public', 'upload', 'books'),
        [".doc", ".pdf", ".fb2", ".txt"]
    );
upload = upload.array('books');
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

            let newBooks = [];
            for (let book of books) {
                book = book.toObject();
                book.isOwnBook = book.author.toString() === req.user._id.toString();
                newBooks.push(book)
            }
            res.json(newBooks);
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
            book = book.toObject();
            book.isOwnBook = book.author === req.user._id;
            res.json(book);
        } catch (e) {
            res.status(404).send(e.toString());
        }
    },
    async createBook(req, res, next) {
        try {
            let author = await User.findOne({_id: req.user._id});
            if (author) {
                upload(req, res, async function (err) {
                    if (err) {
                        err.status = 400;
                        return next(err);
                    } else {
                        let books = [];
                        if (req.files && req.files.length > 0) {
                            for (let file in req.files) {
                                try {
                                    let book = new Book();
                                    book.name = req.files[file].originalname;
                                    book.path = '/upload/books/' + req.files[file].filename;
                                    book.url = 'http://localhost:3000' + book.path;
                                    book.author = author._id;
                                    books.push(await book.supersave());
                                } catch (e) {
                                    e.status = 400;
                                    return next(e);
                                }
                            }
                        } else {
                            let book = new Book();
                            book.name = req.body.url;
                            book.url = req.body.url;
                            book.author = author._id;
                            books.push(await book.supersave());
                        }
                        let newBooks = [];
                        for (let book of books) {
                            book = book.toObject();
                            book.isOwnBook = book.author.toString() === req.user._id.toString();
                            newBooks.push(book)
                        }
                        return res.json(newBooks);
                    }
                });
            } else {
                let error = new Error();
                e.status = 400;
                return next(e);
            }
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async removeBook(req, res, next) {
        let bookId = req.params.id;
        try {
            let book = await Book.findById(bookId);
            book = await book.remove();
            res.status(204).json(book);
        } catch (e) {
            console.log(e);
            res.status(400).send(e.toString());
        }
    }
};