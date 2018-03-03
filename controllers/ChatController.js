let Chat = require('../models/Chat');

module.exports = {
    async getChats(req, res) {
        try {
            let chatQuery = Chat
                .find(req.query.query)
                .sort(req.query.sort)
                .select(req.query.fields);
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
            let chatQuery = Chat.find({_id: chatId})
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
            let chat = await Chat.create(req.body);
            res.status(201).json(chat);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async updateChat(req, res) {
        let chatId = req.params.id;
        try {
            let chat = await Chat.findByIdAndUpdate(chatId, req.body,{new : true});
            res.status(201).json(chat);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async removeChat(req, res) {
        let chatId = req.params.id;
        try {
            let chat = await Chat.findById(chatId);
            chat = await chat.remove();
            res.status(204).json(chat);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    }
};