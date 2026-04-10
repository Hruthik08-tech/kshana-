const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Please provide all required fields.' });
        }

        // Check if user already exists
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Email is already taken.' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user
        const result = await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

        // Generate JWT token
        const token = jwt.sign(
            { user_id: result[0].insertId, email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: { user_id: result[0].insertId, name, email }
        });

    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ error: 'Server error during registration.' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Please provide email and password.' });
        }

        // Check user existence
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }

        const user = users[0];

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }

        // Generate Token
        const token = jwt.sign(
            { user_id: user.user_id, email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: 'Logged in successfully',
            token,
            user: { user_id: user.user_id, name: user.name, email: user.email }
        });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ error: 'Server error during login.' });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const [users] = await db.query('SELECT user_id, name, email, created_at FROM users WHERE user_id = ?', [req.user.user_id]);
        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json({ user: users[0] });

    } catch (error) {
        console.error('Profile Error:', error);
        res.status(500).json({ error: 'Server error fetching profile.' });
    }
};
