const mongoose = require('mongoose');

const seedPermanentAdmin = async () => {
  try {
    const User = require('../models/User.model');
    const adminEmail = 'admin@az.com';
    const adminPassword = 'admin@123';

    // Check if admin already exists
    let admin = await User.findOne({ email: adminEmail });

    if (admin) {
      console.log('✅ Permanent admin account exists.');
      // Optionally update credentials if they differ, but we'll leave it as is if it exists
      // To force it, you could do: admin.password = adminPassword; await admin.save();
    } else {
      console.log('👷 Creating permanent admin account...');
      await User.create({
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
      console.log('✅ Permanent admin account created successfully!');
    }
  } catch (error) {
    console.error('❌ Error during permanent admin seeding:', error.message);
  }
};

const connectDB = async () => {
  try {
    // Disable buffering so we get immediate errors if not connected
    // Buffer commands (default) so requests wait for connection instead of failing
    // mongoose.set('bufferCommands', false); 

    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/garbet', {
      serverSelectionTimeoutMS: 5000, // 5 seconds for faster fail
      socketTimeoutMS: 45000,
      family: 4 // Use IPv4
    });

    console.log(`\u2705 MongoDB Connected: ${conn.connection.host}`);
    console.log(`\ud83d\udcca Database: ${conn.connection.name}`);

    // Seed permanent admin
    await seedPermanentAdmin();
  } catch (error) {
    console.error(`\u274c MongoDB Connection Error: ${error.message}`);
    console.error('');
    console.error('\ud83d\udd27 Troubleshooting Steps:');
    console.error('   1. Make sure MongoDB is installed and running');
    console.error('   2. Check if MONGODB_URI in .env file is correct');
    console.error('   3. For local MongoDB, try: net start MongoDB (as admin)');
    console.error('   4. Or check if "MongoDB Server" is running in Services (services.msc)');
    console.error('   5. Try running "mongod" manually in a terminal to see errors');
    console.error('');
    console.error(`\ud83d\udccb Current connection string: ${process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/garbet'}`);
  }
};

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('\ud83d\udd17 MongoDB connection established');
});

mongoose.connection.on('disconnected', () => {
  console.log('\u26a0\ufe0f  MongoDB disconnected - attempting to reconnect...');
});

mongoose.connection.on('error', (err) => {
  console.error(`\u274c MongoDB error: ${err.message}`);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('\ud83d\udc4b MongoDB connection closed through app termination');
  process.exit(0);
});

module.exports = connectDB;
