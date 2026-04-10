const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../../../auth-gateway/middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected route
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;
