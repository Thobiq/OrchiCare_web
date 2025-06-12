const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', authController.showLoginPage);
router.post('/login', authController.login);
router.get('/monitoring', authController.showHome);
router.get('/logout', authController.logout);

router.get('/forgot-password', authController.showForgotPasswordPage);
router.post('/forgot-password', authController.handleForgotPassword);

router.get('/reset-password/:token', authController.showResetPasswordPage);
router.post('/reset-password/:token', authController.handleResetPassword);

module.exports = router;
