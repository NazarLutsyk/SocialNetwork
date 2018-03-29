let Image = require('../models/Image');
let Gallery = require('../models/Gallery');
let keysValidator = require('../validators/keysValidator');

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
    async createImage(req, res) {
        try {
            let err = keysValidator.diff(Image.schema.tree, req.body);
            if (err) {
                throw new Error('Unknown fields ' + err);
            } else {
                //todo upload
                req.body.author = await Gallery.findOne({author: req.user._id});
                let image = new Image(req.body);
                image = await image.supersave();
                res.status(201).json(image);
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