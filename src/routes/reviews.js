const express = require('express');
const createReview = require('./handler/review/createReview');
const verifyToken = require('../middlewares/verifyToken');
const permission = require('../middlewares/permission');
const router = express.Router();

router.post('/create', verifyToken, permission('user') ,createReview);

module.exports = router;