const express = require('express');
const createReview = require('./handler/review/createReview');
const verifyToken = require('../middlewares/verifyToken');
const permission = require('../middlewares/permission');
const getReviewById = require('./handler/review/getReviewById');
const router = express.Router();

router.post('/create', verifyToken, permission('user') ,createReview);
router.get('/:id', getReviewById);

module.exports = router;