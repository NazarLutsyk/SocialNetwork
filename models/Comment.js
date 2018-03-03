let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CommentSchema = new Schema({
    text : String,
    date : Date,
    author : {
        type : Schema.Types.ObjectId,
        ref : 'Account'
    },
    evaluetable : {
        type : Schema.Types.ObjectId,
        ref : 'Evaluetable'
    }
});

module.exports = mongoose.model('Comment',CommentSchema);