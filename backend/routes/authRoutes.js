const express = require('express');
const router = express.Router();

const {
    loginUser,
    getMe,
    getProfile,
    updateProfile
} = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginUser);

router.get('/me', protect, getMe);

router.get('/profile', protect, getProfile);

router.put('/profile', protect, updateProfile);

module.exports = router;