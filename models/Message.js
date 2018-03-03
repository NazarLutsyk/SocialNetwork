let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let MessageSchema = new Schema({
    text: String,
    date: Date,
    chats: [{
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    }],
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'Image'
    }],
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Books'
    }],
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
});

module.exports = mongoose.model('Message', MessageSchema);