let Evaluetable = require('./Evaluetable');
let Schema = require('mongoose').Schema;

module.exports = Evaluetable.discriminator('Book', new Schema({
    name: String,
    path: String,
    extension: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Library'
    },
    libraries: [{
        type: Schema.Types.ObjectId,
        ref: 'Library'
    }]
}, {
    discriminatorKey: 'kind'
}));