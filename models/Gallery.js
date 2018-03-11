let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let GallerySchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
    },
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'Image'
    }]
});

module.exports = mongoose.model('Gallery', GallerySchema);

let Account = require('./Account');
let Image = require('./Image');

GallerySchema.pre('remove', async function () {
    await Account.update(
        {gallery: this._id},
        {gallery: null}
    );
    await Image.remove(
        {_id : this.images}
    );
});