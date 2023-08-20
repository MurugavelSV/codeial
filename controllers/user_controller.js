const Profile = require('../models/user');

module.exports.profile = (req, res) => {
    return res.render('user_profile', {
        title: 'User Profile',
    });
}

module.exports.signup = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('signup', {
        title: 'signup'
    });
};

module.exports.login = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('login', {
        title: 'login page'
    });
}

module.exports.create = (req, res) => {
    (async() => {
        const user = await Profile.findOne({email: req.body.email});
        if(user){
            console.log('User already exists');
            return res.redirect('back');
        }

        await Profile.create(req.body).then((user) => {
            return res.redirect('/user/login');
        }).catch((err) => {
            console.log('Error in signing up the user');
            return res.redirect('back');
        });

    })();
}

module.exports.createSession = (req, res) => {
    return res.redirect('/');   
};