let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let MessageSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
},{
    timestamps: true,
    toObject: {},
    toJSON: {},
});
MessageSchema.methods.supersave = async function () {
    let User = require('./User');
    let Chat = require('./Chat');

    let chat = await Chat.findById(this.chat);
    let account = await User.findById(this.sender);

    if (!chat) {
        throw new Error('Not found related model Chat!');
    }
    if (!account) {
        throw new Error('Not found related model User!');
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