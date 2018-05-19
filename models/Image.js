let Evaluetable = require('./Evaluetable');
let Schema = require('mongoose').Schema;

let ImageSchema = new Schema({
    path: String,
    url: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    discriminatorKey: 'kind'
});
ImageSchema.statics.notUpdatable = function () {
    return ['path'];
};
ImageSchema.methods.supersave = async function () {
    let User = require('./User');
    let author = await User.findById(this.author);
    if (!author) {
        throw new Error('Not found related model User!');
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

ImageSchema.pre('remove', async function (next) {
    let Post = require('./Post');
    let User = require('./User');
    let fileHelper = require('../helpers/fileHelper');
    let path = require('path');
    await Post.update(
        {images: this.url},
        {$pull: {images: this.url}},
        {multi: true}
    );
    await User.update(
        {avatar: this.url},
        {avatar: 'http://localhost:3000/upload/images/default-avatar.jpg'},
        {multi: true, setDefaultsOnInsert: true}
    );
    await User.update(
        {thumb: this.url},
        {thumb: 'http://localhost:3000/upload/images/default-thumb.jpg'},
        {multi: true, setDefaultsOnInsert: true}
    );
    if (this.path) {
        let toDelete = path.join(__dirname, "../public", this.path);
        fileHelper.deleteFiles(toDelete);
        return next();
    }
});

