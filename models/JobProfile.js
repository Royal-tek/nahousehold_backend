const mongoose = require("mongoose")
const Schema = mongoose.Schema

const JobProfileSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    gender: {
        type: String,
        enum: ['MALE', 'FEMALE'],
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    state: {
        type: String,
        required: true
    },
    businessName: {
        type: String,
        required: true
    },
    // field: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Categories"
    // },
    profileViews: {
        type: Number,
        default: 0
    },
    tags: [{
        type: String,
        lowecase: true
    }]
    
})

module.exports = mongoose.model("JobProfile", JobProfileSchema)