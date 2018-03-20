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
        required: true
    }
}, {
    discriminatorKey: 'kind'
});

module.exports = Evaluetable.discriminator('Book',BookSchema);

let Post = require('./Post');
BookSchema.pre('remove', async function () {
    await Post.update(
        {books: this._id},
        {$pull: {books: this._id}},
        {multi: true}
    );
});