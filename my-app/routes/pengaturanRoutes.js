const express = require('express');
const router = express.Router();
const pengaturanController = require('../controllers/pengaturanController');

router.get('/nilai-batasan', pengaturanController.showDetailNilaiBatasan);
router.get('/ubah-nilai-batasan', pengaturanController.showFormUbahNilaiBatasan);
router.post('/ubah-nilai-batasan', pengaturanController.updateNilaiBatasan);
module.exports = router;