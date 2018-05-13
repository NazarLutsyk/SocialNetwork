let mongoose = require('mongoose');
let Schema = require('mongoose').Schema;
let bcrypt = require('bcrypt');
let ROLES = require('../config/roles');

let UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    login: String,
    password: String,
    email: String,
    phone: String,
    city: String,
    isBanned: {
        type: Boolean,
        default: false
    },
    birthday: Date,
    roles: {
        type: Array,
        default: [ROLES.GLOBAL_ROLES.USER_ROLE]
    },
    avatar: {
        type: Schema.Types.ObjectId,
        ref: 'Image'
    },
    thumb: {
        type: Schema.Types.ObjectId,
        ref: 'Image'
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
}, {
    timestamps: true
});
UserSchema.statics.notUpdatable = function(){
    return ['isBanned','roles'];
};
UserSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};
UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);

let Chat = require('./Chat');
let Gallery = require('./Gallery');
let Wall = require('./Wall');
let Library = require('./Library');
UserSchema.pre('remove', async function () {
    await UserSchema.update(
        {_id: this.friends},
        {$pull: {friends: this._id}}
    );
    await Chat.remove(
        {$and: [{members: this._id}, {members: {$size: {$eq: 1}}}]}
    );
    await Chat.update(
        {$and: [{members: this._id}, {members: {$size: {$gt: 1}}}]},
        {$pull: {members: this._id}}
    );
    await Message.remove(
        {sender: this._id}
    );
    await Gallery.remove(
        {author: this._id}
    );
    await Wall.remove(
        {author: this._id}
    );
    await Library.remove(
        {author: this._id}
    );
});