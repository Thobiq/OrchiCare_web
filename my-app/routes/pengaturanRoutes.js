const express = require('express');
const router = express.Router();
const PengaturanController = require('../controllers/pengaturanController');

// === Nilai Batasan ===
router.get('/nilai-batasan', PengaturanController.showDetailNilaiBatasan);
router.get('/ubah-nilai-batasan', PengaturanController.showFormUbahNilaiBatasan);
router.post('/ubah-nilai-batasan', PengaturanController.updateNilaiBatasan);

// === Mode Sistem ===
router.post('/set-mode', PengaturanController.setMode); // otomatis/manual

// === Kontrol Manual Aktuator ===
router.post('/set-fan', PengaturanController.setFan);
router.post('/set-sprinkler', PengaturanController.setSprinkler);

module.exports = router;
