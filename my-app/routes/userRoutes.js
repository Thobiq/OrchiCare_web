const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// API get profil user (JSON)
router.get('/profile', userController.getUserProfile);

// Halaman edit profil (view)
router.get('/edit_profil', userController.getEditProfile);

// Simpan perubahan profil (POST)
router.post('/edit_profil', userController.postEditProfile);

module.exports = router;
