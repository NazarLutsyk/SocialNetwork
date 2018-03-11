let Evaluetable = require('./Evaluetable');
let Schema = require('mongoose').Schema;

let BookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    extension: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Library',
    },
    reposts: [{
        type: Schema.Types.ObjectId,
        ref: 'Library'
    }],
}, {
    discriminatorKey: 'kind'
});

module.exports = Evaluetable.discriminator('Book',BookSchema);

let Library = require('./Library');
let Post = require('./Post');
let Message = require('./Message');

BookSchema.pre('remove', async function () {
    await Library.update(
        {$or: [{_id: this.author},{_id: this.reposts}]},
        {$pull: {books: this._id}},
        {multi: true}
    );
    await Message.update(
        {books: this._id},
        {$pull: {books: this._id}},
        {multi: true}
    );
    await Post.update(
        {books: this._id},
        {$pull: {books: this._id}},
        {multi: true}
    );
});