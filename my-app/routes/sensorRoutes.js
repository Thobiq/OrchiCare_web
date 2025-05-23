const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

router.get('/api/data', sensorController.getSensorData);

module.exports = router;
