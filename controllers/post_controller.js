const Post = require('../models/post');

module.exports.createPost = (req, res) => {
    (async () => {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        }).then(() => {
            // console.log(post);
            return res.redirect('/');
        }).catch((err) => {
            console.log(`Error: ${err.message}`);
        });
    })();
};