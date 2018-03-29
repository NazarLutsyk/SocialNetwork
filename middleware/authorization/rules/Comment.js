let Comment = require('../../../models/Comment');
module.exports = {
    async updateComment(req, res, next) {
        try {
            let user = req.user;
            let commentId = req.params.id;

            let comment = await Comment.count({_id: commentId, author: user._id});
            if (comment) {
                next();
            } else {
                return res.sendStatus(403);
            }
        } catch (e) {
            return res.status(400).send(e.toString());
        }
    }
};