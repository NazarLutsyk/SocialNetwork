let Message = require('../../../models/Message');
module.exports = {
    async updateMessage(req, res, next) {
        try {
            let user = req.user;
            let messageId = req.params.id;

            let message = await Message.count({_id: messageId, sender: user._id});
            if (message) {
                next();
            } else {
                return res.sendStatus(403);
            }
        } catch (e) {
            return res.status(400).send(e.toString());
        }
    }
};