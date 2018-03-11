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
    }
}, {
    discriminatorKey: 'kind'
});

module.exports = Evaluetable.discriminator('Image', ImageSchema);

let Gallery = require('./Gallery');
let Post = require('./Post');
let Account = require('./Account');
let Message = require('./Message');

ImageSchema.pre('remove', async function () {
    //todo delete image from fs
    await Gallery.update(
        {images: this._id},
        {$pull: {images: this._id}},
        {multi: true}
    );
    await Post.update(
        {images: this._id},
        {$pull: {images: this._id}},
        {multi: true}
    );
    await Message.update(
        {images: this._id},
        {$pull: {images: this._id}},
        {multi: true}
    );
    await Account.update(
        {images: this._id},
        {avatar: null},
        {multi: true}
    );
});

