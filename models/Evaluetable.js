let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let EvaluetableSchema = new Schema({
    posRating: Number,//todo computed
    negRating: Number,//todo computed
    ratings : [{
        type : Schema.Types.ObjectId,
        ref : 'Rating'
    }],
    comments : [{
        type : Schema.Types.ObjectId,
        ref : 'Comment'
    }]
});

module.exports = mongoose.model('Evaluetable',EvaluetableSchema);

let Rating = require('./Rating');
let Comment = require('./Comment');
EvaluetableSchema.pre('remove',async function () {
    await Comment.remove(
        {_id: this.comments}
    );
    await Rating.update(
        {_id: this.ratings},
    );
});