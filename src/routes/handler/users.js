const express = require('express');
const router = express.Router();
const register = require('./users/register');
const getUserById = require('./users/getUserById');
const update = require('./users/update');

router.post('/register', register);
router.get('/:id', getUserById);
router.patch('/:id', update);

module.exports = router;