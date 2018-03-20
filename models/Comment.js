let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CommentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    target: {
        type: Schema.Types.ObjectId,
        ref: 'Evaluetable',
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    }
});

module.exports = mongoose.model('Comment', CommentSchema);