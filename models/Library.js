let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let LibrarySchema = new Schema({
    author : {
        type : Schema.Types.ObjectId,
        ref : 'Library',
        required: true
    }
},{
    timestamps: true
});

LibrarySchema.methods.supersave = async function () {
    let User = require('./User');
    let author = await User.findById(this.author);
    if (!author) {
        throw new Error('Not found related model User!');
    }
    return await this.save();
};

LibrarySchema.methods.superupdate = async function (newDoc) {
    let objectHelper = require('../helpers/objectHelper');
    if (newDoc.author) {
        throw new Error('Can`t update relations!');
    }
    objectHelper.load(this, newDoc);
    return await this.save();
};

module.exports = mongoose.model('Library',LibrarySchema);

let Book = require('./Book');
LibrarySchema.pre('remove', async function () {
    await Book.remove(
        {author : this._id}
    );
});