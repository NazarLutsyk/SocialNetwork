let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let GallerySchema = new Schema({
    author : {
        type : Schema.Types.ObjectId,
        ref : 'Account',
        required: true
    },
    images : [{
        type : Schema.Types.ObjectId,
        ref : 'Image'
    }]
});

module.exports = mongoose.model('Gallery',GallerySchema);