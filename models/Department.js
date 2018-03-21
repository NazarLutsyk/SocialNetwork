let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let DepartmentSchema = new Schema({
    roles : [String],
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    socialGroup : {
        type : Schema.Types.ObjectId,
        ref : 'SocialGroup',
        required: true
    }
});

DepartmentSchema.methods.supersave = async function () {
    let SocialGroup = require('./SocialGroup');
    let User = require('./User');

    let user = await User.findById(this.user);
    let socialGroup = await SocialGroup.findById(this.socialGroup);

    if (!user) {
        throw new Error('Not found related model User!');
    }
    if (!socialGroup) {
        throw new Error('Not found related model SocialGroup!');
    }

    return await this.save();
};

DepartmentSchema.methods.superupdate = async function (newDoc) {
    let objectHelper = require('../helpers/objectHelper');
    if (newDoc.socialGroup || newDoc.user) {
        throw new Error('Can`t update relations!');
    }
    objectHelper.load(this, newDoc);
    return await this.save();
};

module.exports = mongoose.model('Department',DepartmentSchema);