let Evaluetable = require('./Evaluetable');
let Schema = require('mongoose').Schema;

let ImageSchema = new Schema({
    path: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    extension: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref:'gallery',
        required: true
    }
}, {
    discriminatorKey: 'kind'
});

ImageSchema.methods.supersave = async function () {
    let Gallery = require('./Gallery');
    let gallery = await Gallery.findById(this.author);
    if (!gallery) {
        throw new Error('Not found related model Gallery!');
    }
    return await this.save();
};

ImageSchema.methods.superupdate = async function (newDoc) {
    let objectHelper = require('../helpers/objectHelper');
    if (newDoc.author) {
        throw new Error('Can`t update relations!');
    }
    objectHelper.load(this, newDoc);
    return await this.save();
};

module.exports = Evaluetable.discriminator('Image', ImageSchema);

let Post = require('./Post');
ImageSchema.pre('remove', async function () {
    await Post.update(
        {images: this._id},
        {$pull: {images: this._id}},
        {multi: true}
    );
});

