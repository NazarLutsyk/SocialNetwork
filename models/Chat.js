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

ChatSchema.methods.supersave = async function () {
    let Account = require('./Account');
    let accountExists = await Account.count({_id: this.members});
    if ((accountExists === 0 && this.members.length !== 0) || (accountExists !== this.members.length)) {
        throw new Error('Not found related model Account!');
    }
    return await this.save();
};

ChatSchema.methods.superupdate = async function (newDoc) {
    let objectHelper = require(global.paths.HELPERS + '/objectHelper');
    let Account = require('./Account');

    let accountExists = await Account.count({_id: newDoc.members});
    if ((accountExists === 0 && this.members.length !== 0) || (accountExists !== this.members.length)) {
        throw new Error('Not found related model Account!');
    }
    objectHelper.load(this, newDoc);
    return await this.save();
};

module.exports = mongoose.model('Chat', ChatSchema);

let Message = require('./Message');
ChatSchema.pre('remove', async function () {
    await Message.remove(
        {chat: this._id}
    );
});