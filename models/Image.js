let Evaluetable = require('./Evaluetable');
let Schema = require('mongoose').Schema;

let ImageSchema = new Schema({
    path: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    discriminatorKey: 'kind'
});
ImageSchema.statics.notUpdatable = function (){
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

let Post = require('./Post');
ImageSchema.pre('remove', async function (next) {
    let fileHelper = require('../helpers/fileHelper');
    let path = require('path');
    try {
        let toDelete = path.join(__dirname, "../public", this.path);
        fileHelper.deleteFiles(toDelete);
        return next();
    } catch (e) {
        return next(e);
    }
    await Post.update(
        {images: this._id},
        {$pull: {images: this._id}},
        {multi: true}
    );
});

