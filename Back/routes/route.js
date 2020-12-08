const express = require('express');
const router = express();
const apiUser = require('../controllers/User/api');

router.post('/register', apiUser.register);
router.post('/login', apiUser.login);
router.delete('/user/:userId', apiUser.deleteUser);

module.exports = router;
