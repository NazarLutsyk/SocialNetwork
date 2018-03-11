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
    library: {
        type: Schema.Types.ObjectId,
        ref: 'Library'
    },
    wall: {
        type: Schema.Types.ObjectId,
        ref: 'Wall'
    },
    gallery: {
        type: Schema.Types.ObjectId,
        ref: 'Gallery'
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    rating: [{
        type: Schema.Types.ObjectId,
        ref: 'Rating'
    }],
    chats: [{
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }]
}, {
    discriminatorKey: 'kind'
});

module.exports = mongoose.model('Account', AccountSchema);

let Message = require('./Message');
let Chat = require('./Chat');
let Gallery = require('./Gallery');
let Wall = require('./Wall');
let Library = require('./Library');
let Comment = require('./Comment');
let Rating = require('./Rating');

AccountSchema.pre('remove', async function () {
    await Message.remove(
        {_id: this.messages}
    );
    await Chat.remove(
        {$and: [{members: this._id}, {members: {$size: {$eq: 1}}}]}
    );
    await Chat.update(
        {$and: [{members: this._id}, {members: {$size: {$gt: 1}}}]},
        {$pull: {members: this._id}}
    );
    await Gallery.remove(
        {_id : this.gallery}
    );
    await Wall.remove(
        {_id : this.wall}
    );
    await Library.remove(
        {_id : this.library}
    );
    await Comment.remove(
        {_id : this.comments}
    );
    await Rating.remove(
        {_id : this.rating}
    );
});