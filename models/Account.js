let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AccountSchema = new Schema({
    username: String,
    password: String,
    email: String,
    phone: String,
    city: String,
    isBanned: Boolean,
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

models.exports = mongoose.model('Account', AccountSchema);
