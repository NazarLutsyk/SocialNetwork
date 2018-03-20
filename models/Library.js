let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let LibrarySchema = new Schema({
    author : {
        type : Schema.Types.ObjectId,
        ref : 'Account',
        required: true
    }
});

module.exports = mongoose.model('Library',LibrarySchema);

let Book = require('./Book');

LibrarySchema.pre('remove', async function () {
    await Book.remove(
        {author : this._id}
    );
});