const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.json({ token, admin: { id: admin._id, email: admin.email } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Seed Initial Admin (Run once manually or if DB is empty)
router.post('/seed', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if admin exists
        const existing = await Admin.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Admin already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = new Admin({
            email,
            password: hashedPassword
        });

        await admin.save();
        res.status(201).json({ message: 'Admin created' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
