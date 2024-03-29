const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.use('/user', require('./users'));
router.use('/posts', require('./post'));
router.use('/comments', require('./comment'));

module.exports = router;