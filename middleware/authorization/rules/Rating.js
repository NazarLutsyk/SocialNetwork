let Rating = require('../../../models/Rating');
module.exports = {
    async updateComment(req, res, next) {
        try {
            let user = req.user;
            let ratingId = req.params.id;

            let rating = await Rating.count({_id: ratingId, author: user._id});
            if (rating) {
                next();
            } else {
                return res.sendStatus(403);
            }
        } catch (e) {
            return res.status(400).send(e.toString());
        }
    }
};