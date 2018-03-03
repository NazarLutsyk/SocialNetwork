let Evaluetable = require('./Evaluetable');
let Schema = require('mongoose').Schema;

module.exports = Evaluetable.discriminator('Image', new Schema({
    path: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    extension: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Gallery',
        required: true
    },
    galleries: [{
        type: Schema.Types.ObjectId,
        ref: 'Gallery'
    }]
}, {
    discriminatorKey: 'kind'
}));