const express = require('express');
const createReview = require('./handler/review/createReview');
const verifyToken = require('../middlewares/verifyToken');
const permission = require('../middlewares/permission');
const getReviewById = require('./handler/review/getReviewById');
const getReviewByPenjualId = require('./handler/review/getReviewByPenjualId');
const router = express.Router();

router.post('/create', verifyToken, permission('user') ,createReview);
router.get('/:id', getReviewById);
router.get('/penjual/:id', getReviewByPenjualId)

module.exports = router;