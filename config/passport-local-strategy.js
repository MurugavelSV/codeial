const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    }, async (email, password, done) => {
        await User.findOne({
            email: email,
            password: password
        }).then((user) => {
            if(!user){
                console.log('Invalid username/password');
                return done(null, false);
            }
            return done(null, user);
        }).catch((err) => {
            console.log('Error in finding user --> passport');
            return done(err);
        });
}));

// Serialize user and put into cookies

passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize the cookie and extract user id

passport.deserializeUser(async (id, done) => {
    await User.findById(id).then((user) => {
        return done(null, user);
    }).catch((err) => {
        console.log('Error in finding user --> passport');
        return done(err);        
    })
});