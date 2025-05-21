const express = require('express');
const router = express.Router();
const nilaiBatasanController = require('../controllers/nilaiBatasanController');

router.post('/limits', nilaiBatasanController.updateLimits);

module.exports = router;
