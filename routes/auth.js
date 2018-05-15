let router = require('express').Router();
let PassportMiddleware = require('../middleware/passport');
let AuthController = require('../controllers/AuthController');
let Image = require('../models/Image');
let Book = require('../models/Book');
let User = require('../models/User');

router.post('/local/signup', PassportMiddleware.notLoggedIn, AuthController.signUp);
router.post('/local/signin', PassportMiddleware.notLoggedIn, AuthController.signIn);
router.get('/logout', PassportMiddleware.isLoggedIn, AuthController.logout);

router.get('/principal', async function (req, res) {
    let user = req.user.toObject();
    user.imagesCount = await Image.count({author: user.gallery});
    user.booksCount = await Book.count({author: user.library});
    user.friendsCount = await User.count({friends: user._id});
    user.isFriend = req.user.friends.indexOf(user._id.toString()) >= 0 || user._id.toString() === req.user._id.toString();
    res.json(user);
});

module.exports = router;
