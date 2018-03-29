let Chat = require('../../../models/Chat');
module.exports = {
    async updateChat(req, res, next) {
        try {
            let user = req.user;
            let chatId = req.params.id;

            let chat = await Chat.count({_id: chatId, members: user._id});
            if (chat) {
                next();
            } else {
                return res.sendStatus(403);
            }
        } catch (e) {
            return res.status(400).send(e.toString());
        }
    }
};