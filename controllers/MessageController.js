let Message = require('../models/Message');

module.exports = {
    async getMessages(req, res) {
        try {
            let messageQuery = Message
                .find(req.query.query)
                .sort(req.query.sort)
                .select(req.query.fields);
            if (req.query.populate) {
                for (let populateField of req.query.populate) {
                    messageQuery.populate(populateField);
                }
            }
            let messages = await messageQuery.exec();
            res.json(messages);
        } catch (e) {
            res.status(404).send(e.toString());
        }
    },
    async getMessageById(req, res) {
        let messageId = req.params.id;
        try {
            let messageQuery = Message.findOne({_id: messageId})
                .select(req.query.fields);
            if (req.query.populate) {
                for (let populateField of req.query.populate) {
                    messageQuery.populate(populateField);
                }
            }
            let message = await messageQuery.exec();
            res.json(message);
        } catch (e) {
            res.status(404).send(e.toString());
        }
    },
    async createMessage(req, res) {
        try {
            let message = await Message.create(req.body);
            res.status(201).json(message);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async updateMessage(req, res) {
        let messageId = req.params.id;
        try {
            let message = await Message.findByIdAndUpdate(messageId, req.body,{new : true});
            res.status(201).json(message);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async removeMessage(req, res) {
        let messageId = req.params.id;
        try {
            let message = await Message.findById(messageId);
            message = await message.remove();
            res.status(204).json(message);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    }
};