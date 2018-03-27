let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CommentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    target: {
        type: Schema.Types.ObjectId,
        ref: 'Evaluetable',
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    timestamps: true
});
CommentSchema.methods.supersave = async function () {
    let User = require('./User');
    let Evaluetable = require('./Evaluetable');
    let author = await User.findById(this.author);
    let target = await Evaluetable.findById(this.target);

    if (!author) {
        throw new Error('Not found related model User!');
    }
    if (!target) {
        throw new Error('Not found related model Evaluetable!');
    }
    return await this.save();
};

CommentSchema.methods.superupdate = async function (newDoc) {
    let objectHelper = require('../helpers/objectHelper');
    if (newDoc.author || newDoc.target) {
        throw new Error('Can`t update relations!');
    }
    objectHelper.load(this, newDoc);
    return await this.save();
};
module.exports = mongoose.model('Comment', CommentSchema);