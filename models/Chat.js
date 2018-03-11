let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ChatSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    members: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Account'
        }]
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }]
});

module.exports = mongoose.model('Chat', ChatSchema);

let Message = require('./Message');
let Account = require('./Account');

ChatSchema.pre('remove', async function () {
    await Message.remove(
        {_id: this.messages}
    );
    await Account.update(
        {chats: this._id},
        {$pull: {chats: this._id}}
    );
});