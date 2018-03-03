let Evaluetable = require('./Evaluetable');
let Schema = require('mongoose').Schema;

module.exports = Evaluetable.discriminator('Image', new Schema({
    path: String,
    name: String,
    extension: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Gallery'
    },
    galleries: [{
        type: Schema.Types.ObjectId,
        ref: 'Gallery'
    }]
}, {
    discriminatorKey: 'kind'
}));