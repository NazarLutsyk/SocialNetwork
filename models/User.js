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
        type: String,
        default: 'http://localhost:3000/upload/images/default-avatar.jpg'
    },
    thumb: {
        type: String,
        default: 'http://localhost:3000/upload/images/default-thumb.jpg'
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
}, {
    timestamps: true,
});
UserSchema.statics.notUpdatable = function () {
    return ['isBanned', 'roles'];
};
UserSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};
UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
UserSchema.methods.superupdate = async function (context, newDoc) {
    let objectHelper = require('../helpers/objectHelper');

    if (newDoc.hasOwnProperty('friends')) {
        let count = await context.count({_id: newDoc.friends});
        if (count == newDoc.friends.length) {
            let toAdd = [];
            let toRemove = [];
            for (let friend of newDoc.friends) {
                if (this.friends.indexOf(friend.toString()) === -1)
                    toAdd.push(friend);
            }
            for (let friend of this.friends) {
                if (newDoc.friends.indexOf(friend.toString()) === -1)
                    toRemove.push(friend);
            }
            if (toRemove)
                await context.update({_id: {$in: toRemove}}, {$pull: {friends: this._id}}, {
                    multi: true,
                    runValidators: true,
                    context: 'query'
                });
            if (toAdd)
                await context.update({_id: {$in: toAdd}}, {$addToSet: {friends: this._id}}, {
                    multi: true,
                    runValidators: true,
                    context: 'query'
                });
        } else {
            throw new Error('Not found related model context!');
        }
    }

    objectHelper.load(this, newDoc);
    return await this.save();
};

module.exports = mongoose.model('User', UserSchema);

let Chat = require('./Chat');
UserSchema.pre('remove', async function () {
    let Image = require('./Image');
    let Book = require('./Book');
    let Post = require('./Post');
    await Image.remove(
        {author: this._id}
    );
    await Book.remove(
        {author: this._id}
    );
    await Post.remove(
        {author: this._id}
    );
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
});