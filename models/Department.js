let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let DepartmentSchema = new Schema({
    roles : [String],
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    socialGroup : {
        type : Schema.Types.ObjectId,
        ref : 'SocialGroup'
    }
});

module.exports = mongoose.model('Department',DepartmentSchema);