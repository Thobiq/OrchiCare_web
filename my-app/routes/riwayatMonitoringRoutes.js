const express = require('express');
const router = express.Router();
const riwayatMonitoringController = require('../controllers/riwayatMonitoringController');

router.get('/', riwayatMonitoringController.getMonitoringData);
router.delete('/', riwayatMonitoringController.deleteMonitoringData);

module.exports = router;
