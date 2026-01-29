const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

// Subscribe
router.post('/', async (req, res) => {
    const { email } = req.body;

    try {
        const existing = await Subscriber.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: 'Email already subscribed' });
        }

        const subscriber = new Subscriber({ email });
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all subscribers (Admin)
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find().sort({ createdAt: -1 });
        res.json(subscribers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
