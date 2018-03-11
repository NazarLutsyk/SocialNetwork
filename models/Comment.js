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
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'Image'
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
    }
});

module.exports = mongoose.model('Comment', CommentSchema);

let Evaluetable = require('./Evaluetable');
let Account = require('./Account');

CommentSchema.pre('remove',async function () {
    await Evaluetable.update(
        {comments : this._id},
        {$pull: {comments : this._id}},
        {multi: true}
    );
    await Account.update(
        {comments : this._id},
        {$pull: {comments : this._id}},
        {multi: true}
    );
});