let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ChatSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    members: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Account'
        }],
        validate: {
            validator: function () {
                return this.members.length >= 1;
            },
            message: '{PATH} lenght must me greater than 1'
        }
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }]
});

module.exports = mongoose.model('Chat', ChatSchema);