let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let EvaluetableSchema = new Schema({
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