const express = require('express');
const router = express.Router();
const nilaiBatasanController = require('../controllers/nilaiBatasanController');

router.get('/nilai-batasan', nilaiBatasanController.showNilaiBatasan);
module.exports = router;
