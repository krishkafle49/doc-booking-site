// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['patient', 'doctor', 'admin'],
        default: 'patient'
    }
});

// Encrypt password before saving it
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    // Hash the password before saving
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare entered password with stored hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
