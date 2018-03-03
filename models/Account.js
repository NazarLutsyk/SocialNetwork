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
