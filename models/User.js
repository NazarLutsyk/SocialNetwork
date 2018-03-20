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
        {subscribers : this._id},
        {$pull : {subscribers: this._id}}
    );
    await SocialGroup.update(
        {boss : this._id},
        {boss: null}
    );
    await Department.remove(
        {user : this._id}
    );

});