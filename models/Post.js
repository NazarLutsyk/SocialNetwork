let Evaluetable = require('./Evaluetable');
let Schema = require('mongoose').Schema;

let PostSchema = new Schema({
    text: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    images: [String],
    books: [String],
}, {
    discriminatorKey: 'kind',
    timestamps: true,

});

PostSchema.methods.supersave = async function () {
    let User = require('./User');

    let user = await User.findById(this.author);

    if (!user) {
        throw new Error('Not found related model User!');
    }
    return await this.save();
};

PostSchema.methods.superupdate = async function (newDoc) {
    let objectHelper = require('../helpers/objectHelper');

    if (newDoc.author) {
        throw new Error('Can`t update relations!');
    }
    objectHelper.load(this, newDoc);
    return await this.save();
};


module.exports = Evaluetable.discriminator('Post', PostSchema);