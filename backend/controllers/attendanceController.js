const User = require('../models/User');

// Mark attendance for an employee
exports.markAttendance = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const { date, status } = req.body;

        const employee = await User.findById(employeeId);
        if (!employee || employee.role !== 'employee') {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Check if attendance already exists for this date
        const existingRecordIndex = employee.attendance.findIndex(record => record.date === date);

        if (existingRecordIndex !== -1) {
            // Update existing record
            employee.attendance[existingRecordIndex].status = status;
        } else {
            // Add new record
            employee.attendance.push({ date, status });
        }

        await employee.save();
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Error marking attendance', error: error.message });
    }
};

// Get attendance for an employee
exports.getAttendance = async (req, res) => {
    try {
        const { employeeId } = req.params;

        const employee = await User.findById(employeeId);
        if (!employee || employee.role !== 'employee') {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json(employee.attendance);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendance', error: error.message });
    }
};

// Employee Check In
exports.checkIn = async (req, res) => {
    try {

        const employee = await User.findById(req.user._id);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        const today = new Date().toISOString().split("T")[0];

        const attendanceRecord = employee.attendance.find(
            record => record.date === today
        );

        if (attendanceRecord) {
            return res.status(400).json({
                message: "You have already checked in today."
            });
        }

        const now = new Date();

        let status = "Present";

        if (
            now.getHours() > 9 ||
            (now.getHours() === 9 && now.getMinutes() > 30)
        ) {
            status = "Late";
        }

        employee.attendance.push({
            date: today,
            checkIn: now,
            checkOut: null,
            workingHours: 0,
            status
        });

        await employee.save();

        res.status(200).json({
            message: "Check in successful.",
            attendance: employee.attendance
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Employee Check Out
exports.checkOut = async (req, res) => {
    try {

        const employee = await User.findById(req.user._id);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        const today = new Date().toISOString().split("T")[0];

        const attendanceRecord = employee.attendance.find(
            record => record.date === today
        );

        if (!attendanceRecord) {
            return res.status(400).json({
                message: "Please check in first."
            });
        }

        if (attendanceRecord.checkOut) {
            return res.status(400).json({
                message: "You have already checked out today."
            });
        }

        const now = new Date();

        attendanceRecord.checkOut = now;

        const totalHours =
            (attendanceRecord.checkOut - attendanceRecord.checkIn) /
            (1000 * 60 * 60);

        attendanceRecord.workingHours = Number(totalHours.toFixed(2));

        await employee.save();

        res.status(200).json({
            message: "Check out successful.",
            attendance: attendanceRecord
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};