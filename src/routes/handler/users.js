const express = require('express');
const router = express.Router();
const register = require('./users/register');
const getUserById = require('./users/getUserById');
const update = require('./users/update');
const login = require('./users/login');
const logout = require('./users/logout');

router.post('/register', register);
router.get('/:id', getUserById);
router.patch('/:id', update);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;