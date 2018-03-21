let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let WallSchema = new Schema({
    author : {
        type : Schema.Types.ObjectId,
        ref : 'Account',
        required: true
    }
});

WallSchema.methods.supersave = async function () {
    let Account = require('./Account');
    let author = await Account.findById(this.author);
    if (!author) {
        throw new Error('Not found related model Account!');
    }
    return await this.save();
};

WallSchema.methods.superupdate = async function (newDoc) {
    let objectHelper = require('../helpers/objectHelper');
    if (newDoc.author) {
        throw new Error('Can`t update relations!');
    }
    objectHelper.load(this, newDoc);
    return await this.save();
};

module.exports = mongoose.model('Wall',WallSchema);

let Post = require('./Post');
WallSchema.pre('remove', async function () {
    await Post.remove(
        {author : this._id}
    );
});