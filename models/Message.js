let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let MessageSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
});

module.exports = mongoose.model('Message', MessageSchema);