let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let RatingSchema = new Schema({
    value : {
        type: Boolean,
        required: true
    },
    author : {
        type : Schema.Types.ObjectId,
        ref : 'Account',
    }
});

module.exports = mongoose.model('Rating',RatingSchema);

let Evaluetable = require('./Evaluetable');
let Account = require('./Account');

RatingSchema.pre('remove',async function () {
    await Evaluetable.update(
        {ratings : this._id},
        {$pull: {ratings : this._id}},
        {multi: true}
    );
    await Account.update(
        {ratings : this._id},
        {$pull: {ratings : this._id}},
        {multi: true}
    );
});