const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String
    },
    otpExpiresIn: {
        type: Number
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)