const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
    try {
        const adminExists = await Admin.findOne({ email: 'admin@business.com' });
        if (adminExists) {
            console.log('Admin already exists.');
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        const newAdmin = new Admin({
            email: 'admin@business.com',
            password: hashedPassword
        });

        await newAdmin.save();
        console.log('Default Admin Created: admin@business.com / admin123');
    } catch (err) {
        console.error('Error seeding admin:', err);
    }
};

module.exports = seedAdmin;
