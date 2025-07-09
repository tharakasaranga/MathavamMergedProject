const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust path as necessary
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Assuming you have a secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'MathavamSuperSecureSecretKey#2025@!@#RandomString$%^&*()'; // Use environment variable for production!

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }

        // Compare provided password with hashed password in database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }

        // Generate JWT Token
        const payload = {
            userId: user._id,
            userType: user.userType,
            // Include firstName and lastName in the payload if you want them in the token
            // firstName: user.firstName,
            // lastName: user.lastName
        };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour

        // --- THE CRUCIAL CHANGE IS HERE ---
        // Send back the token and relevant user information including firstName and lastName
        res.json({
            message: 'Login successful!',
            token,
            user: {
                _id: user._id,
                username: user.username,
                firstName: user.firstName, // Make sure to send firstName
                lastName: user.lastName,   // Make sure to send lastName
                userType: user.userType,
                // Add any other user details you want the frontend to have immediately after login
            }
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error during login.' });
    }
});

module.exports = router;