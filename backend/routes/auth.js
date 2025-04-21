// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Register User Route
router.post('/register', async (req, res) => {
    const { email, password, role } = req.body;

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists!' });
        }

        // Create new user
        const newUser = new User({
            email,
            password,
            role
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
});

// Login User Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        // Check password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        // Generate JWT Token
        const token = jwt.sign({ userId: user._id, role: user.role }, 'secretKey', {
            expiresIn: '1h'
        });

        res.json({ message: 'Login successful!', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
});

module.exports = router;
