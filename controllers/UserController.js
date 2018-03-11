let User = require('../models/User');

module.exports = {
    async getUsers(req, res) {
        try {
            let userQuery = User
                .find(req.query.query)
                .sort(req.query.sort)
                .select(req.query.fields);
            if (req.query.populate) {
                for (let populateField of req.query.populate) {
                    userQuery.populate(populateField);
                }
            }
            let users = await userQuery.exec();
            res.json(users);
        } catch (e) {
            res.status(404).send(e.toString());
        }
    },
    async getUserById(req, res) {
        let userId = req.params.id;
        try {
            let userQuery = User.findOne({_id: userId})
                .select(req.query.fields);
            if (req.query.populate) {
                for (let populateField of req.query.populate) {
                    userQuery.populate(populateField);
                }
            }
            let user = await userQuery.exec();
            res.json(user);
        } catch (e) {
            res.status(404).send(e.toString());
        }
    },
    async createUser(req, res) {
        try {
            let user = await User.create(req.body);
            res.status(201).json(user);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async updateUser(req, res) {
        let userId = req.params.id;
        try {
            let user = await User.findByIdAndUpdate(userId, req.body,{new : true});
            res.status(201).json(user);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async removeUser(req, res) {
        let userId = req.params.id;
        try {
            let user = await User.findById(userId);
            user = await user.remove();
            res.status(204).json(user);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    }
};