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
        required: true
    },
}, {
    discriminatorKey: 'kind'
});

module.exports = Account.discriminator('SocialGroup', SocialGroupSchema);

let User = require('./User');
let Department = require('./Department');

SocialGroupSchema.pre('remove',async function () {
    await Department.remove(
        {socialGroup : this._id}
    );
});