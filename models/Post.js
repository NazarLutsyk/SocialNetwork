let Evaluetable = require('./Evaluetable');
let Schema = require('mongoose').Schema;

let PostSchema = new Schema({
    text: String,
    date: {
        type: Date,
        default: new Date()
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Wall',
    },
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'Image'
    }],
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }],
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    reposts: [{
        type: Schema.Types.ObjectId,
        ref: 'Wall'
    }]
}, {
    discriminatorKey: 'kind'
});

module.exports = Evaluetable.discriminator('Post', PostSchema);

let Wall = require('./Wall');
let Message = require('./Message');

PostSchema.pre('remove', async function () {
    await Wall.update(
        {$or: [{_id: author},{_id: reposts}]},
        {$pull: {posts: this._id}},
        {multi: true}
    );
    await Message.update(
        {posts: this._id},
        {$pull: {posts: this._id}},
        {multi: true}
    );
});