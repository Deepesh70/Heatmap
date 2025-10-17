const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');

// Define the routes
router.post('/submit', submissionController.submitAnswers);
router.get('/data', submissionController.getHeatmapData);

module.exports = router;