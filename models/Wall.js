let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let WallSchema = new Schema({
    author : {
        type : Schema.Types.ObjectId,
        ref : 'Account',
    },
    posts : [{
        type : Schema.Types.ObjectId,
        ref : 'Post'
    }]
});

module.exports = mongoose.model('Wall',WallSchema);

let Account = require('./Account');
let Post = require('./Post');

WallSchema.pre('remove', async function () {
    await Account.update(
        {wall: this._id},
        {wall: null}
    );
    await Post.remove(
        {_id : this.posts}
    );
});