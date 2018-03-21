let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let GallerySchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
});


GallerySchema.methods.supersave = async function () {
    let Account = require('./Account');
    let author = await Account.findById(this.author);
    if (!author) {
        throw new Error('Not found related model Account!');
    }
    return await this.save();
};

GallerySchema.methods.superupdate = async function (newDoc) {
    let objectHelper = require('../helpers/objectHelper');
    if (newDoc.author) {
        throw new Error('Can`t update relations!');
    }
    objectHelper.load(this, newDoc);
    return await this.save();
};

module.exports = mongoose.model('Gallery', GallerySchema);

let Image = require('./Image');
GallerySchema.pre('remove', async function () {
    await Image.remove(
        {author: this._id}
    );
});