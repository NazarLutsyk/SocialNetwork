let Post = require('../models/Post');

module.exports = {
    async getPosts(req, res) {
        try {
            let postQuery = Post
                .find(req.query.query)
                .sort(req.query.sort)
                .select(req.query.fields);
            if (req.query.populate) {
                for (let populateField of req.query.populate) {
                    postQuery.populate(populateField);
                }
            }
            let posts = await postQuery.exec();
            res.json(posts);
        } catch (e) {
            res.status(404).send(e.toString());
        }
    },
    async getPostById(req, res) {
        let postId = req.params.id;
        try {
            let postQuery = Post.find({_id: postId})
                .select(req.query.fields);
            if (req.query.populate) {
                for (let populateField of req.query.populate) {
                    postQuery.populate(populateField);
                }
            }
            let post = await postQuery.exec();
            res.json(post);
        } catch (e) {
            res.status(404).send(e.toString());
        }
    },
    async createPost(req, res) {
        try {
            let post = await Post.create(req.body);
            res.status(201).json(post);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async updatePost(req, res) {
        let postId = req.params.id;
        try {
            let post = await Post.findByIdAndUpdate(postId, req.body,{new : true});
            res.status(201).json(post);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async removePost(req, res) {
        let postId = req.params.id;
        try {
            let post = await Post.findById(postId);
            post = await post.remove();
            res.status(204).json(post);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    }
};