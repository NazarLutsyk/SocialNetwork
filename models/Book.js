let Evaluetable = require('./Evaluetable');
let Schema = require('mongoose').Schema;

let BookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    extension: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Library',
        required: true
    }
}, {
    discriminatorKey: 'kind',
});
BookSchema.methods.supersave = async function () {
    let Library = require('./Library');
    let library = await Library.findById(this.author);
    if (!library) {
        throw new Error('Not found related model Library!');
    }
    return await this.save();
};

BookSchema.methods.superupdate = async function (newDoc) {
    let objectHelper = require('../helpers/objectHelper');
    if (newDoc.author) {
        throw new Error('Can`t update relations!');
    }
    objectHelper.load(this, newDoc);
    return await this.save();
};

module.exports = Evaluetable.discriminator('Book',BookSchema);
let Post = require('./Post');
BookSchema.pre('remove', async function () {
    await Post.update(
        {books: this._id},
        {$pull: {books: this._id}},
        {multi: true}
    );
});