let Evaluetable = require('./Evaluetable');
let Schema = require('mongoose').Schema;

let PostSchema = new Schema({
    text: String,
    date: {
        type: Date,
        default: new Date()
    },
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

module.exports = Evaluetable.discriminator('Post', PostSchema);