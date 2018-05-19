let Evaluetable = require('./Evaluetable');
let Schema = require('mongoose').Schema;

let BookSchema = new Schema({
    name: String,
    path: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    discriminatorKey: 'kind',
});
BookSchema.statics.notUpdatable = function () {
    return ['path'];
};
BookSchema.methods.supersave = async function () {
    let User = require('./User');
    let author = await User.findById(this.author);
    if (!author) {
        throw new Error('Not found related model User!');
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

module.exports = Evaluetable.discriminator('Book', BookSchema);
BookSchema.pre('remove', async function () {
    let fileHelper = require('../helpers/fileHelper');
    let path = require('path');
    let toDelete = path.join(__dirname, "../public", "upload", "books", this.path);
    fileHelper.deleteFiles(toDelete);
});