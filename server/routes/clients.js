const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const { upload } = require('../middleware/cloudinary');
const auth = require('../middleware/auth');

// Get all clients
router.get('/', async (req, res) => {
    try {
        const clients = await Client.find().sort({ createdAt: -1 });
        res.json(clients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a client
router.post('/', auth, upload.single('image'), async (req, res) => {
    const { name, designation, description } = req.body;
    let image = '';

    if (req.file) {
        image = req.file.path; // Cloudinary URL
    }

    const client = new Client({
        name,
        designation,
        description,
        image
    });

    try {
        const newClient = await client.save();
        res.status(201).json(newClient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a client
router.put('/:id', auth, upload.single('image'), async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) return res.status(404).json({ message: 'Client not found' });

        if (req.body.name) client.name = req.body.name;
        if (req.body.designation) client.designation = req.body.designation;
        if (req.body.description) client.description = req.body.description;
        if (req.file) {
            client.image = req.file.path; // Cloudinary URL
        }

        const updatedClient = await client.save();
        res.json(updatedClient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a client
router.delete('/:id', auth, async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) return res.status(404).json({ message: 'Client not found' });

        await client.deleteOne();
        res.json({ message: 'Client deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
