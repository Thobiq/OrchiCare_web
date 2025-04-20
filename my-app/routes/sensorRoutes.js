// ---------- routes/sensorRoutes.js ----------
const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

router.get('/', sensorController.getAllSensorData);

module.exports = router;