const express = require('express');
const router = express.Router();
const getRecomendationByHighRating = require('./handler/recomendation/getRecomenMenuByHighRating');
const getRecomendationByReview = require('./handler/recomendation/recomendationMenuByReview');
const verifyToken = require('../middlewares/verifyToken');

router.get('/high-rating', getRecomendationByHighRating);
router.get('/by-review', verifyToken, getRecomendationByReview);

module.exports = router;