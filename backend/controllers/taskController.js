const User = require('../models/User');

// @desc    Add a task to an employee
// @route   POST /api/tasks/:employeeId
// @access  Private/Admin
const addTask = async (req, res) => {
    try {
        const employee = await User.findById(req.params.employeeId);
        if (!employee || employee.role !== 'employee') {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const { taskTitle, taskDescription, taskDate, category } = req.body;
        if (!taskTitle || !taskDate || !category) {
            return res.status(400).json({ message: 'taskTitle, taskDate, and category are required' });
        }

        const newTask = {
            active: false,
            newTask: true,
            completed: false,
            failed: false,
            taskTitle,
            taskDescription: taskDescription || '',
            taskDate,
            category,
        };

        employee.tasks.push(newTask);
        await employee.save();

        // Return the full updated employee (without password)
        const updated = await User.findById(req.params.employeeId).select('-password');
        res.status(201).json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update a task
// @route   PUT /api/tasks/:employeeId/:taskId
// @access  Private/Admin
const updateTask = async (req, res) => {
    try {
        if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.employeeId) {
            return res.status(403).json({ message: 'Not authorized to update this task' });
        }
        const employee = await User.findById(req.params.employeeId);
        if (!employee || employee.role !== 'employee') {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const task = employee.tasks.id(req.params.taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const { taskTitle, taskDescription, taskDate, category, active, completed, failed, newTask } = req.body;
        if (taskTitle !== undefined)       task.taskTitle       = taskTitle;
        if (taskDescription !== undefined) task.taskDescription = taskDescription;
        if (taskDate !== undefined)        task.taskDate        = taskDate;
        if (category !== undefined)        task.category        = category;
        if (active !== undefined)          task.active          = active;
        if (completed !== undefined)       task.completed       = completed;
        if (failed !== undefined)          task.failed          = failed;
        if (newTask !== undefined)         task.newTask         = newTask;

        await employee.save();
        const updated = await User.findById(req.params.employeeId).select('-password');
        res.json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:employeeId/:taskId
// @access  Private/Admin
const deleteTask = async (req, res) => {
    try {
        const employee = await User.findById(req.params.employeeId);
        if (!employee || employee.role !== 'employee') {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const task = employee.tasks.id(req.params.taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.deleteOne();
        await employee.save();
        res.json({ message: 'Task removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { addTask, updateTask, deleteTask };
