let Image = require('../models/Image');

module.exports = {
    async getImages(req, res) {
        try {
            let imageQuery = Image
                .find(req.query.query)
                .sort(req.query.sort)
                .select(req.query.fields);
            if (req.query.populate) {
                for (let populateField of req.query.populate) {
                    imageQuery.populate(populateField);
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
            let imageQuery = Image.find({_id: imageId})
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
            let image = await Image.create(req.body);
            res.status(201).json(image);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async updateImage(req, res) {
        let imageId = req.params.id;
        try {
            let image = await Image.findByIdAndUpdate(imageId, req.body,{new : true});
            res.status(201).json(image);
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