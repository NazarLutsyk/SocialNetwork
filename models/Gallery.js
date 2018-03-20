let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let GallerySchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
});

module.exports = mongoose.model('Gallery', GallerySchema);

let Image = require('./Image');

GallerySchema.pre('remove', async function () {
    await Image.remove(
        {author : this._id}
    );
});