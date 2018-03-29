let User = require('../../../models/User');
module.exports = {
    async updateUser(req, res, next) {
        try {
            let user = req.user;
            let userId = req.params.id;
            if (user._id.equals(userId)) {
                return next();
            } else {
                return res.sendStatus(403);
            }
        } catch (e) {
            return res.status(400).send(e.toString());
        }
    }
};