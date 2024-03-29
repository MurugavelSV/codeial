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
                req.flash('success', 'Comment created successfully');
                return res.redirect('back');  
            }
            req.flash('error', 'Cannot create comment for invalid post');
            return res.redirect('back');
        }catch(err){
            req.flash('error', 'Error in creating comment');
            return res.redirect('back');
        };
    })();
}

module.exports.destroyComment = (req, res) => {
    (async () => {
        try{
            const comment = await Comment.findById(req.query.commentId);
            if(comment){
                if(comment.user == req.user.id){
                    const post = await Post.findById(req.query.postId);
                    post.comment = post.comment.filter((id) => {
                        return id != req.query.commentId;
                    });
                    post.save();
                    await Comment.deleteOne({_id: req.query.commentId});
                    req.flash('success', 'Comment deleted!');
                    return res.redirect('back');
                }
                req.flash('error', 'Unauthorized to delete this comment');
                return res.redirect('back');
            }
            return res.redirect('back');
        }catch(err){
            req.flash('error', 'Error in deleting comment');
            return res.redirect('back');
        }
    })();
}