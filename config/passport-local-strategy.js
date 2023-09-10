const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    },async (req, email, password, done) => {
        await User.findOne({
            email: email,
            password: password
        }).then((user) => {
            if(!user){
                req.flash('error', 'Invalid username/password');
                return done(null, false);
            }else{
                return done(null, user);
            }
        }).catch((err) => {
            req.flash('error', 'Error in finding user');
            return done(err);
        });
}));

// Serialize user and put into cookies

passport.serializeUser(async (user, done) => {
    done(null, user._id);
});

// Deserialize the cookie and extract user id

passport.deserializeUser(async (id, done) => {
    await User.findById(id).then((user) => {
        return done(null, user);
    }).catch((err) => {
        req.flash('error', 'Error in finding user');
        return done(err);        
    })
});

passport.checkAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }

    req.flash('error', 'Unauthorized to do this action');
    return res.redirect('/user/signup');
}

passport.setAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }

    return next();
}

module.exports = passport;