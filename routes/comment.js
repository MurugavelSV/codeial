const express = require('express');
const router = express.Router();
const passport = require('passport');
const commentController = require('../controllers/comment_controller');

router.post('/create', passport.checkAuthenticated, commentController.createComment);
router.get('/delete/', passport.checkAuthenticated, commentController.destroyComment);

module.exports = router;