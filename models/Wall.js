let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let WallSchema = new Schema({
    author : {
        type : Schema.Types.ObjectId,
        ref : 'Account'
    },
    posts : [{
        type : Schema.Types.ObjectId,
        ref : 'Post'
    }]
});

module.exports = mongoose.model('Wall',WallSchema);