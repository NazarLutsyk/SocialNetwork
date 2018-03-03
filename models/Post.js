let Evaluetable = require('./Evaluetable');
let Schema = require('mongoose').Schema;

module.exports = Evaluetable.discriminator('Post', new Schema({
    text: String,
    date: {
        type: Date,
        default: new Date()
    },
    posRating: Number,//todo computed
    negRating: Number,//todo computed
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