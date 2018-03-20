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

module.exports = Evaluetable.discriminator('Image', ImageSchema);

let Post = require('./Post');

ImageSchema.pre('remove', async function () {
    await Post.update(
        {images: this._id},
        {$pull: {images: this._id}},
        {multi: true}
    );
});

