const express = require('express');

const router = express.Router();

const passport = require('passport');

const userController = require('../controllers/user_controller');

router.get('/profile/:id', passport.checkAuthenticated, userController.showProfiles);

router.get('/profile',passport.checkAuthenticated, userController.profile);

router.get('/signup', userController.signup);

router.get('/login', userController.login);

router.post('/create', userController.create);

router.post('/update-profile', userController.updateProfile);

router.post('/create-session', passport.authenticate(
    'local',
    {
        failureRedirect: '/'
    }
), userController.createSession);

router.get('/sign-out', userController.destroySession);

module.exports = router;