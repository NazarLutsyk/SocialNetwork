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
        required: true
    }
});

module.exports = mongoose.model('Rating',RatingSchema);