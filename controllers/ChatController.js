let Chat = require('../models/Chat');
let keysValidator = require('../validators/keysValidator');

module.exports = {
    async getChats(req, res) {
        try {
            let chatQuery;
            chatQuery = Chat
                .find({members:req.user._id})
                .find(req.query.query)
                .sort(req.query.sort)
                .select(req.query.fields)
                .skip(req.query.skip)
                .limit(req.query.limit);
            if (req.query.populate) {
                for (let populateField of req.query.populate) {
                    chatQuery.populate(populateField);
                }
            }
            let chats = await chatQuery.exec();
            res.json(chats);
        } catch (e) {
            res.status(404).send(e.toString());
        }
    },
    async getChatById(req, res) {
        let chatId = req.params.id;
        try {
            let chatQuery = Chat.findOne({_id: chatId, members:req.user._id})
                .select(req.query.fields);
            if (req.query.populate) {
                for (let populateField of req.query.populate) {
                    chatQuery.populate(populateField);
                }
            }
            let chat = await chatQuery.exec();
            res.json(chat);
        } catch (e) {
            res.status(404).send(e.toString());
        }
    },
    async createChat(req, res) {
        try {
            let err = keysValidator.diff(Chat.schema.tree, req.body);
            if (err) {
                throw new Error('Unknown fields ' + err);
            } else {
                //todo auto members
                let chat = new Chat(req.body);
                chat = await chat.supersave();
                res.status(201).json(chat);
            }
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async updateChat(req, res) {
        let chatId = req.params.id;
        try {
            let err = keysValidator.diff(Chat.schema.tree, req.body);
            if (err) {
                throw new Error('Unknown fields ' + err);
            } else {
                let chat = await Chat.findById(chatId);
                if (chat && req.body) {
                    let updated = await chat.superupdate(req.body);
                    res.status(201).json(updated);
                } else {
                    res.sendStatus(404);
                }
            }
        } catch (e) {
            res.status(400).send(e.toString());
        }
    }
};