let User = require('../models/User');
let keysValidator = require('../validators/keysValidator');
let Image = require('../models/Image');
let Book = require('../models/Book');
module.exports = {
    async getUsers(req, res) {
        try {
            let userQuery;
            if (req.query.aggregate) {
                userQuery = User.aggregate(req.query.aggregate);
            } else {
                userQuery = User
                    .find(req.query.query)
                    .sort(req.query.sort)
                    .select(req.query.fields)
                    .skip(req.query.skip)
                    .limit(req.query.limit);
                if (req.query.populate) {
                    for (let populateField of req.query.populate) {
                        userQuery.populate(populateField);
                    }
                }
            }
            let users = await userQuery.exec();
            let newUsers = [];
            for (let user of users) {
                user = user.toObject();
                user.imagesCount = await Image.count({author: user.gallery});
                user.booksCount = await Book.count({author: user.library});
                user.friendsCount = await User.count({friends: user._id});
                user.isFriend = req.user.friends.indexOf(user._id.toString()) >= 0 || user._id.toString() === req.user._id.toString();
                newUsers.push(user)
            }
            res.json(newUsers);
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
            user = user.toObject();
            user.imagesCount = await Image.count({author: user.gallery});
            user.booksCount = await Book.count({author: user.library});
            user.friendsCount = await User.count({friends: user._id});
            user.isFriend = req.user.friends.indexOf(user._id.toString()) >= 0 || user._id.toString() === req.user._id.toString();
            res.json(user);
        } catch (e) {
            res.status(404).send(e.toString());
        }
    },
    async updateUser(req, res) {
        let userId = req.params.id;
        try {
            let err = keysValidator.diff(User.schema.tree, req.body);
            if (err) {
                throw new Error('Unknown fields ' + err);
            } else {
                let user = await User.findById(userId);
                if (user && req.body) {
                    let updated = await user.superupdate(User,req.body);
                    res.status(201).json(updated);
                } else {
                    res.sendStatus(404);
                }
            }
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