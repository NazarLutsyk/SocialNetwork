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
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
    },
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

let Chat = require('./Chat');
let Account = require('./Account');

MessageSchema.pre('remove', async function () {
    await Chat.update(
        {_id: this.chat},
        {$pull: {messages: this._id}}
    );
    await Account.update(
        {messages: this._id},
        {$pull: {messages: this._id}}
    );
});