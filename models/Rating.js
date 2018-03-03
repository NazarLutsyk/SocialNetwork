let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let RatingSchema = new Schema({
    value : Boolean,
    author : {
        type : Schema.Types.ObjectId,
        ref : 'Account'
    },
    evaluetable : {
        type : Schema.Types.ObjectId,
        ref : 'Evaluetable'
    }
});

module.exports = mongoose.model('Rating',RatingSchema);