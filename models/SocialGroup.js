let Account = require('./Account');
let Schema = require('mongoose').Schema;

let SocialGroupSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    description : String,
    subscribers : [{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }],
    boss : {
        type : Schema.Types.ObjectId,
        ref : 'User',
    },
    departments : [{
        type : Schema.Types.ObjectId,
        ref : 'Department'
    }],
}, {
    discriminatorKey: 'kind'
});

module.exports = Account.discriminator('SocialGroup', SocialGroupSchema);

let User = require('./User');
let Department = require('./Department');

SocialGroupSchema.pre('remove',async function () {
    await Department.remove(
        {_id : this.departments}
    );
    await User.update(
        {_id : this.boss},
        {$pull: {createdSocialGroups: this._id}}
    );
    await User.update(
        {_id : this.subscribers},
        {$pull: {subscribes: this._id}},
        {multi: true}
    );
});