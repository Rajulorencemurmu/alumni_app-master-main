const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    number: { type: String, unique: true, required: true },
    image: { type: String, required: true },
    occupation: { type: String, enum: ["Student", "Professor", "Alumni","Teacher","Doctor","Lawyer","Software Developer"], required: true }, // Add occupation field
    
    // Add occupation-specific fields
    workingPlace: { type: String }, // Only for Alumni

    batches: [{ type: String }], // Array of batch strings

    friendRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    sentFriendRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    
    location: {
        type: {
            type: String,
            enum: ["Point"],
        },
        coordinates: {
            type: [Number],
        },
    },
    
})


// Index for location field
userSchema.index({ location: "2dsphere" });

const User = mongoose.model("User", userSchema)
module.exports = User
