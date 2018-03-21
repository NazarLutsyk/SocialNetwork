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
}, {
    discriminatorKey: 'kind'
});

SocialGroupSchema.methods.supersave = async function () {
    let User = require('./User');
    let usersExists = await User.count({_id: this.subscribers});
    if ((usersExists === 0 && this.subscribers.length !== 0) || (usersExists !== this.subscribers.length)) {
        throw new Error('Not found related model User!');
    }
    return await this.save();
};

SocialGroupSchema.methods.superupdate = async function (newDoc) {
    let objectHelper = require('../helpers/objectHelper');
    let User = require('./User');
    let placeTypeExists = await User.count({_id: newDoc.subscribers});
    if ((placeTypeExists === 0 && this.subscribers.length !== 0) || (placeTypeExists !== this.subscribers.length)) {
        throw new Error('Not found related model User!');
    }
    objectHelper.load(this, newDoc);
    return await this.save();
};

module.exports = Account.discriminator('SocialGroup', SocialGroupSchema);

let User = require('./User');
let Department = require('./Department');

SocialGroupSchema.pre('remove',async function () {
    await Department.remove(
        {socialGroup : this._id}
    );
});