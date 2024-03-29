const User = require('../models/user');

module.exports.profile = (req, res) => {
    return res.render('user_profile', {
        title: 'User Profile',
    });
};

module.exports.showProfiles = (req, res) => {
    (async () => {
        await User.findById(req.params.id).then((user) => {
            return res.render('friends_profile', {
                title: user.name  + ' | Profile',
                friend: user
            }); 
        }).catch((err) => {
            req.flash('error', 'Unexpected error occurred');
            return res.redirect('back');
        }); 
    })();
};

module.exports.updateProfile = (req, res) => {
    (async () => {
        try{
            const user = await User.findById(req.user.id);
            if(user){
                await User.updateOne({_id: req.user.id}, req.body);
                req.flash('success', 'Updated successfully');
                return res.redirect('back');
            }
        }catch(err){
            req.flash('error', 'Error in updating profile');
            return res.redirect('back');
        }
    })();
};

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
            req.flash('error', 'User already exists');
            return res.redirect('back');
        }

        await User.create(req.body).then((user) => {
            req.flash('success', 'User created successfully');
            return res.redirect('/user/login');
        }).catch((err) => {
            req.flash('error', 'Error in signing up the user');
            return res.redirect('back');
        });

    })();
}

module.exports.createSession = (req, res) => {
    req.flash('success', 'Logged in successfully');
    return res.redirect('/');   
};

module.exports.destroySession = (req, res) => {
    req.logout((err) => {
        if(err){
            req.flash('error', 'Error in signing out');
            return res.redirect('/');
        }
        req.flash('success', 'You have logged out!!');
        return res.redirect('/');
    });
};