let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let LibrarySchema = new Schema({
    author : {
        type : Schema.Types.ObjectId,
        ref : 'Account',
    },
    books : [{
        type : Schema.Types.ObjectId,
        ref : 'Book'
    }]
});

module.exports = mongoose.model('Library',LibrarySchema);

let Account = require('./Account');
let Book = require('./Book');

LibrarySchema.pre('remove', async function () {
    await Account.update(
        {library: this._id},
        {library: null}
    );
    await Book.remove(
        {_id : this.books}
    );
});