const express = require('express');

const router = express.Router();

const passport = require('passport');

const userController = require('../controllers/user_controller');
const urlParser = express.urlencoded({extended: false});

router.get('/profile', userController.profile);
router.get('/signup', userController.signup);
router.get('/login', userController.login);
router.post('/create', urlParser, userController.create);
router.post('/create-session', urlParser, passport.authenticate(
    'local',{
    successRedirect: '/user/profile',
    failureRedirect: '/'}
), userController.createSession);

module.exports = router;