let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let WallSchema = new Schema({
    author : {
        type : Schema.Types.ObjectId,
        ref : 'Account',
        required: true
    }
});

module.exports = mongoose.model('Wall',WallSchema);

let Post = require('./Post');

WallSchema.pre('remove', async function () {
    await Post.remove(
        {author : this._id}
    );
});