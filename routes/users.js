const express = require('express');

const router = express.Router();

const userController = require('../controllers/user_controller');
const urlParser = express.urlencoded({extended: false});

router.get('/profile', userController.profile);
router.get('/signup-page', userController.signupPageRender);
router.get('/login', userController.login);
router.post('/create', urlParser, userController.create);
router.get('/create-session',urlParser, userController.createSession);

module.exports = router;