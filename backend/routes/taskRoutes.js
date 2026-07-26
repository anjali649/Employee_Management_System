const express = require('express');
const router = express.Router();
const { addTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/:employeeId', protect, adminOnly, addTask);
router.put('/:employeeId/:taskId', protect, updateTask);
router.delete('/:employeeId/:taskId', protect, adminOnly, deleteTask);

module.exports = router;
