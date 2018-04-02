let Image = require('../models/Image');
let Gallery = require('../models/Gallery');
let keysValidator = require('../validators/keysValidator');
let path = require('path');
let upload =
    require('../middleware/multer')(
        path.join(__dirname, '../public', 'upload', 'images'),
        [".jpg", ".jpeg", ".png", ".svg", ".gif"]
    );
upload = upload.array('images');
module.exports = {
    async getImages(req, res) {
        try {
            let imageQuery;
            if (req.query.aggregate) {
                imageQuery = Image.aggregate(req.query.aggregate);
            } else {
                imageQuery = Image
                    .find(req.query.query)
                    .sort(req.query.sort)
                    .select(req.query.fields)
                    .skip(req.query.skip)
                    .limit(req.query.limit);
                if (req.query.populate) {
                    for (let populateField of req.query.populate) {
                        imageQuery.populate(populateField);
                    }
                }
            }
            let images = await imageQuery.exec();
            res.json(images);
        } catch (e) {
            res.status(404).send(e.toString());
        }
    },
    async getImageById(req, res) {
        let imageId = req.params.id;
        try {
            let imageQuery = Image.findone({_id: imageId})
                .select(req.query.fields);
            if (req.query.populate) {
                for (let populateField of req.query.populate) {
                    imageQuery.populate(populateField);
                }
            }
            let image = await imageQuery.exec();
            res.json(image);
        } catch (e) {
            res.status(404).send(e.toString());
        }
    },
    async createImage(req, res, next) {
        try {
            let err = keysValidator.diff(Image.schema.tree, req.body);
            if (err) {
                throw new Error('Unknown fields ' + err);
            } else {
                let author = await Gallery.findOne({author: req.user._id});
                if (author) {
                    upload(req, res, async function (err) {
                        if (err) {
                            err.status = 400;
                            return next(err);
                        } else {
                            let images = [];
                            for (let file in req.files) {
                                try {
                                    let image = new Image();
                                    image.path = req.files[file].filename;
                                    image.author = author;
                                    images.push(await image.supersave());
                                } catch (e) {
                                    e.status = 400;
                                    return next(e);
                                }
                            }
                            res.status(201).json(images);
                        }
                    });
                } else {
                    let error = new Error();
                    e.status = 400;
                    return next(e);
                }
            }

        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async removeImage(req, res) {
        let imageId = req.params.id;
        try {
            let image = await Image.findById(imageId);
            image = await image.remove();
            res.status(204).json(image);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    }
};