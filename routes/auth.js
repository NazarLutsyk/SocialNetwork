let router = require('express').Router();
let PassportMiddleware = require('../middleware/passport');
let AuthController = require('../controllers/AuthController');

router.post('/local/signup', PassportMiddleware.notLoggedIn, AuthController.signUp);
router.post('/local/signin', PassportMiddleware.notLoggedIn, AuthController.signIn);
router.get('/logout', PassportMiddleware.isLoggedIn, AuthController.logout);

router.get('/principal', function (req, res) {
    res.json({
        user: req.user
    });
});

module.exports = router;
