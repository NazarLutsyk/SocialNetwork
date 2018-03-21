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
MessageSchema.methods.supersave = async function () {
    let Account = require('./Account');
    let Chat = require('./Chat');

    let chat = await Chat.findById(this.chat);
    let account = await Account.findById(this.sender);

    if (!chat) {
        throw new Error('Not found related model Chat!');
    }
    if (!account) {
        throw new Error('Not found related model Account!');
    }

    return await this.save();
};

MessageSchema.methods.superupdate = async function (newDoc) {
    let objectHelper = require('../helpers/objectHelper');
    if (newDoc.sender || newDoc.chat) {
        throw new Error('Can`t update relations!');
    }
    objectHelper.load(this, newDoc);
    return await this.save();
};
module.exports = mongoose.model('Message', MessageSchema);