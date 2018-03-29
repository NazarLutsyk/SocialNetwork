let Library = require('../../../models/Library');
let Book = require('../../../models/Book');
module.exports = {
    async updateBook(req, res, next) {
        try {
            let user = req.user;
            let bookId = req.params.id;
            let book = await Book.findById(bookId);
            let library = await Library.count({_id: book.author, author: user._id});
            if (library > 0) {
                next();
            } else {
                return res.sendStatus(403);
            }
        } catch (e) {
            return res.status(400).send(e.toString());
        }
    }
};