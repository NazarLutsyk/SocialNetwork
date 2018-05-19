let Post = require('../models/Post');
let User = require('../models/User');
let keysValidator = require('../validators/keysValidator');

module.exports = {
    async getPosts(req, res) {
        try {
            let postQuery;
            if (req.query.aggregate) {
                postQuery = Post.aggregate(req.query.aggregate);
            } else {
                postQuery = Post
                    .find(req.query.query)
                    .sort(req.query.sort)
                    .select(req.query.fields)
                    .skip(req.query.skip)
                    .limit(req.query.limit);
                if (req.query.populate) {
                    for (let populateField of req.query.populate) {
                        postQuery.populate(populateField);
                    }
                }
            }
            let posts = await postQuery.exec();
            let newPosts = [];
            for (let post of posts) {
                post = post.toObject();
                post.isOwnPost = post.author.toString() === req.user._id.toString();
                newPosts.push(post)
            }
            res.json(newPosts);
        } catch (e) {
            res.status(404).send(e.toString());
        }
    },
    async getPostById(req, res) {
        let postId = req.params.id;
        try {
            let postQuery = Post.findOne({_id: postId})
                .select(req.query.fields);
            if (req.query.populate) {
                for (let populateField of req.query.populate) {
                    postQuery.populate(populateField);
                }
            }
            let post = await postQuery.exec();
            post = post.toObject();
            post.isOwnPost = post.author === req.user._id;
            res.json(post);
        } catch (e) {
            res.status(404).send(e.toString());
        }
    },
    async createPost(req, res) {
        try {
            let err = keysValidator.diff(Post.schema.tree, req.body);
            if (err) {
                throw new Error('Unknown fields ' + err);
            } else {
                let author = await User.findOne({_id: req.user._id});
                let post = new Post(req.body);
                post.author = author._id;
                post = await post.supersave();
                post = post.toObject();
                post.isOwnPost = post.author === req.user._id;
                res.status(201).json(post);
            }
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async updatePost(req, res) {
        let postId = req.params.id;
        try {
            let err = keysValidator.diff(Post.schema.tree, req.body);
            if (err){
                throw new Error('Unknown fields ' + err);
            } else {
                let post = await Post.findById(postId);
                if (post && req.body) {
                    let updated = await post.superupdate(req.body);
                    res.status(201).json(updated);
                }else {
                    res.sendStatus(404);
                }
            }
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