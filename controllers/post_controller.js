const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.createPost = (req, res) => {
    (async () => {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        }).then(() => {
            req.flash('success', 'Post created successfully');
            return res.redirect('/');
        }).catch((err) => {
            req.flash('error', 'Error in creating post');
            return res.redirect('/');
        });
    })();
};

module.exports.destroyPost = (req, res) => {
    (async () => {
        try{
            const post = await Post.findById(req.params.id);
            if(post){
                await Post.deleteOne({_id: req.params.id});
                await Comment.deleteMany({post: req.params.id});
                req.flash('success', 'Post deleted successfully');
                return res.redirect('back');
            }

            req.flash('error', 'Error in finding the given post');
            return res.redirect('back');
        }catch(err){
            req.flash('error', 'Error in deleting post');
            return res.redirect('back');
        }
    })();
}