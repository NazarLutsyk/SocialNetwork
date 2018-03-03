let Evaluetable = require('./Evaluetable');
let Schema = require('mongoose').Schema;

module.exports = Evaluetable.discriminator('Book', new Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    extension: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Library',
        required: true
    },
    libraries: [{
        type: Schema.Types.ObjectId,
        ref: 'Library'
    }]
}, {
    discriminatorKey: 'kind'
}));