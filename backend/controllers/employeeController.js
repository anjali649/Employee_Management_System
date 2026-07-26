const User = require('../models/User');

// @desc    Get all employees
// @route   GET /api/employees
// @access  Private/Admin
const getEmployees = async (req, res) => {
    try {
        const employees = await User.find({ role: 'employee' }).select('-password');
        res.json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
// @desc    Create Employee
// @route   POST /api/employees
// @access  Private/Admin

// @desc    Create Employee
// @route   POST /api/employees
// @access  Private/Admin

const createEmployee = async (req, res) => {
    try {

        const {
            name,
            email,
            password,
            phone,
            address,
            role,
            skills,
            emergencyContact
        } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "Employee already exists"
            });
        }

        const employee = new User({
            name,
            email,
            password,
            phone,
            address,
            role: role || "employee",
            skills,
            emergencyContact,
            tasks: [],
            attendance: []
        });

        await employee.save();

        res.status(201).json(employee);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: err.message
        });

    }
};

// @desc    Update Employee
// @route   PUT /api/employees/:id
// @access  Private/Admin

const updateEmployee = async (req, res) => {
    try {
        const employee = await User.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        employee.name = req.body.name || employee.name;
        employee.phone = req.body.phone || employee.phone;
        employee.address = req.body.address || employee.address;
        employee.role = req.body.role || employee.role;

        employee.skills = req.body.skills || employee.skills;

        employee.emergencyContact = req.body.emergencyContact || employee.emergencyContact;

        const updatedEmployee = await employee.save();

        res.json(updatedEmployee);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: err.message
        });
    }
};

// @desc    Delete Employee
// @route   DELETE /api/employees/:id
// @access  Private/Admin

const deleteEmployee = async (req, res) => {
    try {
        const employee = await User.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        await User.findByIdAndDelete(req.params.id);

        res.json({
            message: "Employee deleted successfully"
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = { getEmployees, createEmployee, updateEmployee, deleteEmployee };