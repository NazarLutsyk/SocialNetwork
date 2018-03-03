let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let LibrarySchema = new Schema({
    author : {
        type : Schema.Types.ObjectId,
        ref : 'Account'
    },
    books : [{
        type : Schema.Types.ObjectId,
        ref : 'Book'
    }]
});

module.exports = mongoose.model('Library',LibrarySchema);