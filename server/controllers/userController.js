// controllers/userController.js (updated)
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken

// @desc    Add a new user
// @route   POST /api/users/add
// @access  Public (for now, will add authentication later)
exports.addUser = async (req, res) => {
    // Add this console.log to inspect the incoming request body
    console.log('Received request body in addUser:', req.body);

    // Add childRegNo to the destructuring
    const { firstName, lastName, idNumber, userType, username, password, confirmPassword, childRegNo } = req.body;

    // 1. Basic Validation
    if (!firstName || !lastName || !idNumber || !userType || !username || !password || !confirmPassword) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Conditional validation for childRegNo if userType is 'Parent'
    if (userType === 'Parent' && !childRegNo) {
        return res.status(400).json({ message: 'Please enter Child Registration Number for Parent user type.' });
    }

    try {
        // 2. Check if user already exists (by ID Number or Username)
        let userById = await User.findOne({ idNumber });
        if (userById) {
            return res.status(400).json({ message: 'User with this ID Number already exists' });
        }

        let userByUsername = await User.findOne({ username });
        if (userByUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // 3. Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create new user instance
        const newUser = new User({
            firstName,
            lastName,
            idNumber,
            userType,
            username,
            password: hashedPassword, // Store hashed password
            childRegNo: userType === 'Parent' ? childRegNo : null // Store childRegNo only if userType is 'Parent', otherwise null
        });

        // 5. Save user to database
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User added successfully', user: savedUser });

    } catch (error) {
        console.error('Error adding user:', error);
        // Check for Mongoose validation errors (e.g., enum validation, required fields from schema)
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Public (for now, will add authentication later)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password field from response
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get a single user by ID
// @route   GET /api/users/:id
// @access  Public (for now)
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        // Check for invalid ID format (e.g., if not a valid ObjectId)
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid User ID format' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update a user by ID
// @route   PUT /api/users/:id
// @access  Public (for now)
exports.updateUser = async (req, res) => {
    // Add childRegNo to the destructuring for updates
    const { firstName, lastName, idNumber, userType, username, password, confirmPassword, childRegNo } = req.body;

    // You can add validation here for updates as well
    if (password && password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match for update' });
    }

    // Conditional validation for childRegNo during update
    if (userType === 'Parent' && !childRegNo) {
        return res.status(400).json({ message: 'Please enter Child Registration Number for Parent user type.' });
    }
    // If userType changes from 'Parent' to something else, childRegNo should be removed or set to null
    if (userType !== 'Parent' && childRegNo) {
        // Option 1: Set to null explicitly
        req.body.childRegNo = null;
        // Option 2: Delete the property from req.body if you want it to be truly absent
        // delete req.body.childRegNo;
    }


    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if ID Number or Username is being changed to an already existing one (excluding self)
        if (idNumber && idNumber !== user.idNumber) {
            const existingIdUser = await User.findOne({ idNumber });
            if (existingIdUser && existingIdUser._id.toString() !== req.params.id) {
                return res.status(400).json({ message: 'ID Number already in use by another user' });
            }
        }
        if (username && username !== user.username) {
            const existingUsernameUser = await User.findOne({ username });
            if (existingUsernameUser && existingUsernameUser._id.toString() !== req.params.id) {
                return res.status(400).json({ message: 'Username already in use by another user' });
            }
        }

        // Update fields
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.idNumber = idNumber || user.idNumber;
        user.userType = userType || user.userType;
        user.username = username || user.username;
        user.childRegNo = childRegNo; // <--- Update childRegNo field

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await user.save();
        // Exclude password and confirmPassword from the response
        const { password: _, confirmPassword: __, ...userResponse } = updatedUser.toObject();
        res.status(200).json({ message: 'User updated successfully', user: userResponse });
    } catch (error) {
        console.error('Error updating user:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid User ID format' });
        }
        // Check for Mongoose validation errors during update
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Server error' });
    }
};


// @desc    Delete a user by ID
// @route   DELETE /api/users/:id
// @access  Public (for now)
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.deleteOne({ _id: req.params.id }); // Use deleteOne on the model directly
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid User ID format' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: 'Please enter both username and password' });
    }

    try {
        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT Token
        const payload = {
            user: {
                id: user.id, // MongoDB's _id
                userType: user.userType, // Include userType in token for role-based access
                username: user.username
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, // Your secret key from .env
            { expiresIn: '1h' }, // Token expires in 1 hour
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, username: user.username, userType: user.userType } });
            }
        );

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};