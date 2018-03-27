let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let EvaluetableSchema = new Schema({
},{
    timestamps: true
});

module.exports = mongoose.model('Evaluetable',EvaluetableSchema);

let Rating = require('./Rating');
let Comment = require('./Comment');
EvaluetableSchema.pre('remove',async function () {
    await Comment.remove(
        {target: this._id}
    );
    await Rating.update(
        {target: this._id},
    );
});