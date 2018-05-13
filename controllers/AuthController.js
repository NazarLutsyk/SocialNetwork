let passport = require('passport');
let Wall = require('../models/Wall');
let Library = require('../models/Library');
let Gallery = require('../models/Gallery');
module.exports = {
    signUp(req, res, next) {
        passport.authenticate('local.signup', function (err, user, info) {
            if (err) {
                return res.status(400).send(err);
            }
            if (!user) {
                return res.sendStatus(400);
            }
            req.logIn(user, async function (err) {
                if (err) {
                    return next(err);
                }
                let wall = new Wall({
                    author: user._id
                });
                let library = new Library({
                    author: user._id
                });
                let gallery = new Gallery({
                    author: user._id
                });
                await wall.supersave();
                await gallery.supersave();
                await library.supersave();
                return res.status(200).json(req.user);
            });

        })(req, res, next);
    },
    signIn(req, res, next) {
        passport.authenticate('local.signin', function (err, user, info) {
            if (err) {
                return res.status(400).send(err);
            }
            if (!user) {
                return res.sendStatus(400);
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.status(200).json(req.user);
            });
        })(req, res, next);
    },
    logout(req, res, next) {
        req.logout();
        res.sendStatus(200);
    }
};