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
            ref: 'User'
        }]
    },
},{
    timestamps: true
});

ChatSchema.methods.supersave = async function () {
    let User = require('./User');
    let accountExists = await User.count({_id: this.members});
    if ((accountExists === 0 && this.members.length !== 0) || (accountExists !== this.members.length)) {
        throw new Error('Not found related model User!');
    }
    return await this.save();
};

ChatSchema.methods.superupdate = async function (newDoc) {
    let objectHelper = require('../helpers/objectHelper');
    let User = require('./User');

    let accountExists = await User.count({_id: newDoc.members});
    if ((accountExists === 0 && this.members.length !== 0) || (accountExists !== newDoc.members.length)) {
        throw new Error('Not found related model User!');
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