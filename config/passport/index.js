let passport = require('passport');
let LocalStrategy = require('./LocalStrategy');
let User = require('../../models/User');

passport.serializeUser(function (user, done) {
    done(null, user._id);
});
passport.deserializeUser(async function (id, done) {
    try {
        let user = await User.findById(id);
        return done(null, user);
    } catch (e) {
        return done(e);
    }
});

passport.use('local.signup',LocalStrategy.LocalSignup);
passport.use('local.signin',LocalStrategy.LocalSignin);