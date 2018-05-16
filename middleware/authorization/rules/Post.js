let User = require('../../../models/User');
let Post = require('../../../models/Post');
module.exports = {
    async updatePost(req, res, next) {
        try {
            let user = req.user;
            let postId = req.params.id;
            let post = await Post.findById(postId);
            let wall = await User.count({_id: post.author, _id: user._id});
            if (wall > 0) {
                next();
            } else {
                return res.sendStatus(403);
            }
        } catch (e) {
            return res.status(400).send(e.toString());
        }
    }
};