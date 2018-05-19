let LocalStrategy = require('passport-local');
let User = require('../../models/User');

exports.LocalSignup = new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password',
        passReqToCallback: true
    }, async function (req, login, password, done) {
        try {
            if (await User.count({login: login}) > 0) {
                return done(null, false,{message: 'Login is already in use.'});
            } else {
                req.body.avatar = undefined;
                req.body.thumb = undefined;
                let user = new User(req.body);
                user.password = user.encryptPassword(user.password);
                user = await user.save();
                return done(null, user);
            }
        } catch (e) {
            return done(e);
        }
    }
);
exports.LocalSignin = new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password',
    passReqToCallback: true
}, async function (req, login, password,done) {
    try {
        let user = await User.findOne({login: login});
        if (user) {
            if (user.validPassword(password)){
                done(null,user);
            }else {
                done(null,false);
            }
        } else {
            return done(null, false);
        }
    } catch (e) {
        return done(e);
    }
});