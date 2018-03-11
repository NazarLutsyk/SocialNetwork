let Wall = require('../models/Wall');

module.exports = {
    async getWalls(req, res) {
        try {
            let wallQuery = Wall
                .find(req.query.query)
                .sort(req.query.sort)
                .select(req.query.fields);
            if (req.query.populate) {
                for (let populateField of req.query.populate) {
                    wallQuery.populate(populateField);
                }
            }
            let walls = await wallQuery.exec();
            res.json(walls);
        } catch (e) {
            res.status(404).send(e.toString());
        }
    },
    async getWallById(req, res) {
        let wallId = req.params.id;
        try {
            let wallQuery = Wall.findOne({_id: wallId})
                .select(req.query.fields);
            if (req.query.populate) {
                for (let populateField of req.query.populate) {
                    wallQuery.populate(populateField);
                }
            }
            let wall = await wallQuery.exec();
            res.json(wall);
        } catch (e) {
            res.status(404).send(e.toString());
        }
    },
    async createWall(req, res) {
        try {
            let wall = await Wall.create(req.body);
            res.status(201).json(wall);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async updateWall(req, res) {
        let wallId = req.params.id;
        try {
            let wall = await Wall.findByIdAndUpdate(wallId, req.body,{new : true});
            res.status(201).json(wall);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async removeWall(req, res) {
        let wallId = req.params.id;
        try {
            let wall = await Wall.findById(wallId);
            wall = await wall.remove();
            res.status(204).json(wall);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    }
};