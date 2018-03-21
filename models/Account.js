let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AccountSchema = new Schema({
    login: String,
    password: String,
    email: String,
    phone: String,
    city: String,
    isBanned: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: Schema.Types.ObjectId,
        ref: 'Image'
    },
}, {
    discriminatorKey: 'kind'
});

module.exports = mongoose.model('Account', AccountSchema);

let Chat = require('./Chat');
let Gallery = require('./Gallery');
let Wall = require('./Wall');
let Library = require('./Library');

AccountSchema.pre('remove', async function () {
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
        {author : this._id}
    );
    await Wall.remove(
        {author : this._id}
    );
    await Library.remove(
        {author : this._id}
    );
});