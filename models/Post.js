let Evaluetable = require('./Evaluetable');
let Schema = require('mongoose').Schema;

let PostSchema = new Schema({
    text: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Wall',
        required: true
    },
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'Image'
    }],
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }],
}, {
    discriminatorKey: 'kind'
});

PostSchema.methods.supersave = async function () {
    let Wall = require('./Wall');
    let Book = require('./Book');
    let Image = require('./Image');

    let wall = await Wall.findById(this.author);
    let bookExists = await Book.count({_id: this.books});
    let imageExists = await Image.count({_id: this.images});

    if ((bookExists === 0 && this.books.length !== 0) || (bookExists !== this.books.length)) {
        throw new Error('Not found related model Book!');
    }
    if ((imageExists === 0 && this.images.length !== 0) || (imageExists !== this.images.length)) {
        throw new Error('Not found related model Image!');
    }
    if (!wall) {
        throw new Error('Not found related model Wall!');
    }
    return await this.save();
};

PostSchema.methods.superupdate = async function (newDoc) {
    let objectHelper = require('../helpers/objectHelper');
    let Book = require('./Book');
    let Image = require('./Image');

    let bookExists = await Book.count({_id: newDoc.books});
    let imageExists = await Image.count({_id: newDoc.images});

    if (newDoc.author) {
        throw new Error('Can`t update relations!');
    }
    if (newDoc.books && newDoc.books.length > 0) {
        if ((bookExists === 0 && this.books.length !== 0) || (bookExists !== newDoc.books.length)) {
            throw new Error('Not found related model Book!');
        }
    }
    if (newDoc.images && newDoc.images.length > 0) {
        if ((imageExists === 0 && this.images.length !== 0) || (imageExists !== newDoc.images.length)) {
            throw new Error('Not found related model Image!');
        }
    }
    objectHelper.load(this, newDoc);
    return await this.save();
};


module.exports = Evaluetable.discriminator('Post', PostSchema);