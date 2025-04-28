const express = require('express');
const router = express.Router();
const container = require('../container/container');

const controller = container.get('analysisController');

// Define the route for the analysis endpoint
router.post('/upload',controller.analyzeFrame.bind(controller));

module.exports = router;
