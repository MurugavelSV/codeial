const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.createComment = (req, res) => {
    (async () => {
        try{
            const post = await Post.findById(req.body.post);
            if(post){
                const comments = await Comment.create({
                    content: req.body.content,
                    user: req.user._id,
                    post: req.body.post
                });
                post.comment.push(comments._id);
                post.save();   
            }
            return res.redirect('back');
        }catch(err){
            console.log(`Error: ${err.message}`);
        };
    })();
}