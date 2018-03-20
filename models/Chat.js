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
});

module.exports = mongoose.model('Chat', ChatSchema);

let Message = require('./Message');
let Account = require('./Account');

ChatSchema.pre('remove', async function () {
    await Message.remove(
        {chat: this._id}
    );
});