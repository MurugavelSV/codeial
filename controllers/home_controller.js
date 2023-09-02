const Post = require('../models/post');

module.exports.home = (req, res) => {
    (async () => {
        try{
            const posts = await Post.find({}).populate('user');
            return res.render('home', {
                title: 'Codeial',
                postList: posts
            });
        }catch(err){
            console.log(`Error: ${err.message}`);
        }
    })();
}