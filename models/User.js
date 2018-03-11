let Account = require('./Account');
let Schema = require('mongoose').Schema;

let UserSchema = new Schema({
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
});

module.exports = Account.discriminator('User', UserSchema);

let SocialGroup = require('./SocialGroup');
let Department = require('./Department');

UserSchema.pre('remove',async function (){
    await UserSchema.update(
        {_id : this.friends},
        {$pull : {friends: this._id}}
    );
    await SocialGroup.update(
        {_id : this.subscribes},
        {$pull : {subscribers: this._id}}
    );
    await SocialGroup.update(
        {_id : this.createdSocialGroups},
        {boss: null}
    );
    await Department.remove(
        {_id : this.this.departments}
    );

});