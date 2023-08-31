const User = require('../models/user');

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
        title: 'Codeial | Sign up'
    });
};

module.exports.login = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('login', {
        title: 'Codeial | Login'
    });
}

module.exports.create = (req, res) => {
    (async() => {
        const user = await User.findOne({email: req.body.email});
        if(user){
            console.log('User already exists');
            return res.redirect('back');
        }

        await User.create(req.body).then((user) => {
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

module.exports.destroySession = (req, res) => {
    req.logout((err) => {
        if(err){
            return console.log(`Error: ${err.message}`);
        }
        return res.redirect('/');
    });
};