const express = require('express');
const router = express.Router();
const register = require('./users/register');

router.post('/register', register);

module.exports = router;