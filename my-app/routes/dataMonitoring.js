const express = require('express');
const router = express.Router();
const DataMonitoringController = require('../controllers/dataMonitoringController');Controller = require('../controllers/dataMonitoringController');
router.get('/monitoring', DataMonitoringController.showMonitoring);
router.get('/suhu', DataMonitoringController.showSuhuGh);
router.get('/kelembaban-gh', DataMonitoringController.showKelembabanGh);
router.get('/kelembaban-tanaman', DataMonitoringController.showKelembabanTanaman);
router.get('/nilai-batasan', DataMonitoringController.showNilaiBatasan);
router.get('/status-fan', DataMonitoringController.showStatusFan);
router.get('/status-sprinkler', DataMonitoringController.showStatusSprinkler);
// router.get('/monitoring/latest', DataMonitoringController.getLatest);

module.exports = router;
