const express = require('express');
const router = express.Router();
const register = require('./handler/users/register');
const getUserById = require('./handler/users/getUserById');
const update = require('./handler/users/update');
const login = require('./handler/users/login');
const logout = require('./handler/users/logout');
const verifyToken = require('../middlewares/verifyToken');

router.post('/register', register);
router.get('/:id', getUserById);
router.patch('/:id', verifyToken, update);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;