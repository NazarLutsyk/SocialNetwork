let Library = require('../models/Library');

module.exports = {
    async getLibrarys(req, res) {
        try {
            let libraryQuery = Library
                .find(req.query.query)
                .sort(req.query.sort)
                .select(req.query.fields);
            if (req.query.populate) {
                for (let populateField of req.query.populate) {
                    libraryQuery.populate(populateField);
                }
            }
            let librarys = await libraryQuery.exec();
            res.json(librarys);
        } catch (e) {
            res.status(404).send(e.toString());
        }
    },
    async getLibraryById(req, res) {
        let libraryId = req.params.id;
        try {
            let libraryQuery = Library.findOne({_id: libraryId})
                .select(req.query.fields);
            if (req.query.populate) {
                for (let populateField of req.query.populate) {
                    libraryQuery.populate(populateField);
                }
            }
            let library = await libraryQuery.exec();
            res.json(library);
        } catch (e) {
            res.status(404).send(e.toString());
        }
    },
    async createLibrary(req, res) {
        try {
            let library = await Library.create(req.body);
            res.status(201).json(library);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async updateLibrary(req, res) {
        let libraryId = req.params.id;
        try {
            let library = await Library.findByIdAndUpdate(libraryId, req.body,{new : true});
            res.status(201).json(library);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async removeLibrary(req, res) {
        let libraryId = req.params.id;
        try {
            let library = await Library.findById(libraryId);
            library = await library.remove();
            res.status(204).json(library);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    }
};