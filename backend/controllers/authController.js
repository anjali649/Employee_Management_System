const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                tasks: user.tasks,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get current logged-in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    res.json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        tasks: req.user.tasks,
    });
};
// @desc    Get logged in user's profile
// @route   GET /api/auth/profile
// @access  Private

const getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};



// @desc    Update Profile
// @route   PUT /api/auth/profile
// @access  Private

const updateProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.phone = req.body.phone;
        user.address = req.body.address;
        user.skills = req.body.skills;

        user.profileImage = req.body.profileImage;

        user.emergencyContact = req.body.emergencyContact;

        await user.save();

        res.json({
            message: "Profile Updated",
            user
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("Login attempt:", email);

        const user = await User.findOne({ email });

        console.log("User found:", !!user);

        if (user) {
            const isMatch = await user.matchPassword(password);
            console.log("Password match:", isMatch);

            if (isMatch) {
                return res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    tasks: user.tasks,
                    token: generateToken(user._id),
                });
            }
        }

        res.status(401).json({ message: "Invalid email or password" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
module.exports = { loginUser, getMe, getProfile, updateProfile };