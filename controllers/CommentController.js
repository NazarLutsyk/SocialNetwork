let Comment = require('../models/Comment');

module.exports = {
    async getComments(req, res) {
        try {
            let commentQuery = Comment
                .find(req.query.query)
                .sort(req.query.sort)
                .select(req.query.fields);
            if (req.query.populate) {
                for (let populateField of req.query.populate) {
                    commentQuery.populate(populateField);
                }
            }
            let comments = await commentQuery.exec();
            res.json(comments);
        } catch (e) {
            res.status(404).send(e.toString());
        }
    },
    async getCommentById(req, res) {
        let commentId = req.params.id;
        try {
            let commentQuery = Comment.find({_id: commentId})
                .select(req.query.fields);
            if (req.query.populate) {
                for (let populateField of req.query.populate) {
                    commentQuery.populate(populateField);
                }
            }
            let comment = await commentQuery.exec();
            res.json(comment);
        } catch (e) {
            res.status(404).send(e.toString());
        }
    },
    async createComment(req, res) {
        try {
            let comment = await Comment.create(req.body);
            res.status(201).json(comment);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async updateComment(req, res) {
        let commentId = req.params.id;
        try {
            let comment = await Comment.findByIdAndUpdate(commentId, req.body,{new : true});
            res.status(201).json(comment);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async removeComment(req, res) {
        let commentId = req.params.id;
        try {
            let comment = await Comment.findById(commentId);
            comment = await comment.remove();
            res.status(204).json(comment);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    }
};