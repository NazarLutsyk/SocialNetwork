let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ChatSchema = new Schema({
    name: String,
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'Account'
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }]
});

module.exports = mongoose.model('Chat', ChatSchema);