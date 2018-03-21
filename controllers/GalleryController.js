let Gallery = require('../models/Gallery');
let keysValidator = require('../validators/keysValidator');

module.exports = {
    async getGallerys(req, res) {
        try {
            let galleryQuery = Gallery
                .find(req.query.query)
                .sort(req.query.sort)
                .select(req.query.fields);
            if (req.query.populate) {
                for (let populateField of req.query.populate) {
                    galleryQuery.populate(populateField);
                }
            }
            let gallerys = await galleryQuery.exec();
            res.json(gallerys);
        } catch (e) {
            res.status(404).send(e.toString());
        }
    },
    async getGalleryById(req, res) {
        let galleryId = req.params.id;
        try {
            let galleryQuery = Gallery.findOne({_id: galleryId})
                .select(req.query.fields);
            if (req.query.populate) {
                for (let populateField of req.query.populate) {
                    galleryQuery.populate(populateField);
                }
            }
            let gallery = await galleryQuery.exec();
            res.json(gallery);
        } catch (e) {
            res.status(404).send(e.toString());
        }
    },
    async createGallery(req, res) {
        try {
            let gallery = new Gallery(req.body);
            gallery = await gallery.supersave();
            res.status(201).json(gallery);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async updateGallery(req, res) {
        let galleryId = req.params.id;
        try {
            let err = keysValidator.diff(Gallery.schema.tree, req.body);
            if (err){
                throw new Error('Unknown fields ' + err);
            } else {
                let gallery = await Gallery.findById(galleryId);
                if (gallery && req.body) {
                    let updated = await Gallery.superupdate(req.body);
                    res.status(201).json(updated);
                }else {
                    res.sendStatus(404);
                }
            }
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async removeGallery(req, res) {
        let galleryId = req.params.id;
        try {
            let gallery = await Gallery.findById(galleryId);
            gallery = await gallery.remove();
            res.status(204).json(gallery);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    }
};