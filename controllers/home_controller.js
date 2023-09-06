const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = (req, res) => {
    (async () => {
        try{
            const posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comment',
                populate: {
                    path: 'user'
                }
            });
            const users = await User.find({});
            return res.render('home', {
                title: 'Codeial',
                postList: posts,
                all_users: users
            });
        }catch(err){
            console.log(`Error: ${err.message}`);
        }
    })();
}