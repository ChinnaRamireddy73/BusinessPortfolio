const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String, // URL or Path
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Client', ClientSchema);
