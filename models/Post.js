let Evaluetable = require('./Evaluetable');
let Schema = require('mongoose').Schema;

module.exports = Evaluetable.discriminator('Post', new Schema({
    text: String,
    date: Date,
    posRating: Number,
    negRating: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Wall'
    },
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'Image'
    }],
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }],
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    reposts: [{
        type: Schema.Types.ObjectId,
        ref: 'Account'
    }]
}, {
    discriminatorKey: 'kind'
}));