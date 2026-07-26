const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const taskSchema = new mongoose.Schema({
    active: { type: Boolean, default: false },
    newTask: { type: Boolean, default: true },
    completed: { type: Boolean, default: false },
    failed: { type: Boolean, default: false },
    taskTitle: { type: String, required: true },
    taskDescription: { type: String, required: true },
    taskDate: { type: String, required: true },
    category: { type: String, required: true }
});

const attendanceSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true // YYYY-MM-DD
    },

    checkIn: {
        type: Date,
        default: null
    },

    checkOut: {
        type: Date,
        default: null
    },

    workingHours: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        enum: ["Present", "Absent", "Late"],
        default: "Absent"
    }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['admin', 'employee'],
        required: true
    },

    tasks: [taskSchema],

    attendance: [attendanceSchema],

    phone: {
        type: String,
        default: ""
    },

    address: {
        type: String,
        default: ""
    },

    skills: [{
        type: String
    }],

    profileImage: {
        type: String,
        default: ""
    },

    emergencyContact: {
        name: {
            type: String,
            default: ""
        },
        relation: {
            type: String,
            default: ""
        },
        phone: {
            type: String,
            default: ""
        }
    }

}, {
    timestamps: true
});
// Middleware to hash password before saving (only if password modified)
userSchema.pre('save', async function() {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to verify password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
