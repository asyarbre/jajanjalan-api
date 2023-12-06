const express = require('express');
const createReview = require('./handler/review/createReview');
const verifyToken = require('../middlewares/verifyToken');
const permission = require('../middlewares/permission');
const getReviewById = require('./handler/review/getReviewById');
const getReviewByPenjualId = require('./handler/review/getReviewByPenjualId');
const updateReview = require('./handler/review/updateReview');
const getAllReview = require('./handler/review/getAllReview');
const router = express.Router();

router.get('/', getAllReview);
router.post('/create', verifyToken, permission('user') ,createReview);
router.get('/:id', getReviewById);
router.get('/penjual/:id', getReviewByPenjualId);
router.patch('/:id', verifyToken, permission('user'), updateReview);

module.exports = router;