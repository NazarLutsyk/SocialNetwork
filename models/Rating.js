let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let RatingSchema = new Schema({
    value : {
        type: Boolean,
        required: true
    },
    target: {
        type: Schema.Types.ObjectId,
        ref: 'Evaluetable',
        required: true
    },
    author : {
        type : Schema.Types.ObjectId,
        ref : 'Account',
        required: true
    }
});

RatingSchema.methods.supersave = async function () {
    let Account = require('./Account');
    let Evaluetable = require('./Evaluetable');
    let author = await Account.findById(this.author);
    let target = await Evaluetable.findById(this.target);

    if (!author) {
        throw new Error('Not found related model Account!');
    }
    if (!target) {
        throw new Error('Not found related model Evaluetable!');
    }
    return await this.save();
};

RatingSchema.methods.superupdate = async function (newDoc) {
    let objectHelper = require('../helpers/objectHelper');
    if (newDoc.author || newDoc.target) {
        throw new Error('Can`t update relations!');
    }
    objectHelper.load(this, newDoc);
    return await this.save();
};

module.exports = mongoose.model('Rating',RatingSchema);