const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// API: Ambil profil
router.get('/profile', userController.getUserProfile);

// Web: Edit profil
router.get('/edit_profil', userController.getEditProfile);
router.post('/edit_profil', userController.postEditProfile);

module.exports = router;
