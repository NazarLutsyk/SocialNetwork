let Account = require('./Account');
let Schema = require('mongoose').Schema;

module.exports = Account.discriminator('User', new Schema({
    name : {
        type: String,
        required: true
    },
    surname : {
        type: String,
        required: true
    },
    birthday : Date,
    roles : [String],//todo
    friends : [{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }],
    blockedAccounts : [{
        type : Schema.Types.ObjectId,
        ref : 'Account'
    }],
    subscribes : [{
        type : Schema.Types.ObjectId,
        ref : 'SocialGroup'
    }],
    studySocialGroups : [{
        type : Schema.Types.ObjectId,
        ref : 'SocialGroup'
    }],
    createdSocialGroups : [{
        type : Schema.Types.ObjectId,
        ref : 'SocialGroup'
    }],
    departments : [{
        type : Schema.Types.ObjectId,
        ref : 'Department'
    }],
}, {
    discriminatorKey: 'kind'
}));