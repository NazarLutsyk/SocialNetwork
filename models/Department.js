let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let DepartmentSchema = new Schema({
    roles : [String],//todo roles enum
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

module.exports = mongoose.model('Department',DepartmentSchema);