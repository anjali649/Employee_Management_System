const express = require('express');
const router = express.Router();

const attendanceController = require('../controllers/attendanceController');
const { protect } = require('../middleware/authMiddleware');

// Admin routes
router.post('/:employeeId/mark', attendanceController.markAttendance);
router.get('/:employeeId', attendanceController.getAttendance);

// Employee routes
router.post('/check-in', protect, attendanceController.checkIn);
router.post('/check-out', protect, attendanceController.checkOut);

module.exports = router;