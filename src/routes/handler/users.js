const express = require('express');
const router = express.Router();
const register = require('./users/register');
const getUserById = require('./users/getUserById');

router.post('/register', register);
router.get('/:id', getUserById);

module.exports = router;