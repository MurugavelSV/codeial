const Post = require('../models/post');
const Comment = require('../models/comment');

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

module.exports.destroyPost = (req, res) => {
    (async () => {
        try{
            const post = await Post.findById(req.params.id);
            if(post){
                await Post.deleteOne({_id: req.params.id});
                await Comment.deleteMany({post: req.params.id});
            }
            return res.redirect('back');
        }catch(err){
            console.log(`Error: ${err.message}`);
        }
    })();
}