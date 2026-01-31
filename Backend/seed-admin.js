const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User.model');

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const adminEmail = 'admin@az.com';
        const adminPassword = 'admin@123';

        // Check if admin already exists
        let admin = await User.findOne({ email: adminEmail });

        if (admin) {
            console.log('Admin account already exists. Updating password...');
            admin.password = adminPassword;
            admin.role = 'admin';
            await admin.save();
        } else {
            console.log('Creating new admin account...');
            admin = await User.create({
                email: adminEmail,
                password: adminPassword,
                username: 'Admin',
                firstName: 'System',
                lastName: 'Admin',
                phone: '1234567890',
                role: 'admin',
                balance: 100000,
                kycStatus: 'verified'
            });
        }

        console.log('Admin account seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
