let Account = require('./Account');
let Schema = require('mongoose').Schema;

module.exports = Account.discriminator('SocialGroup', new Schema({
    name : String,
    description : String,
    subscribers : [{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }],
    author : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    departments : [{
        type : Schema.Types.ObjectId,
        ref : 'Department'
    }],
}, {
    discriminatorKey: 'kind'
}));