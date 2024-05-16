const mongoose = require('mongoose');

// Define the schema for admin users
const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, default: 'admin@gmail.com' },
    password: { type: String, required: true, default: 'admin' },
    // You can add any additional fields specific to admin users here
});

// Create the Admin model using the adminSchema
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
