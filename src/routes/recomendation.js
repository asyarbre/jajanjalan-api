const express = require('express');
const router = express.Router();
const getRecomendationByHighRating = require('./handler/recomendation/getRecomenMenuByHighRating');

router.get('/high-rating', getRecomendationByHighRating);

module.exports = router;