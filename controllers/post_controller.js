const Post = require('../models/post');

module.exports.createPost = (req, res) => {
    (async () => {
        if(req.isAuthenticated()){
            await Post.create({
                content: req.body.content,
                user: req.user._id
            }).then((post) => {
                // console.log(post);
                return res.redirect('/');
            }).catch((err) => {
                console.log(`Error: ${err}`);
            });
        }else{
            res.redirect('/');
        }
    })();
};