const mongoose = require("mongoose")
const Schema = mongoose.Schema

const JobProfileSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    personal: {
        gender: {
            type: String,
            enum: ['MALE', 'FEMALE'],
        },
        state: {
            type: String,
        }
    },
    business: {
        businessName: {
            type: String,
        },
        field: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categories"
        },
        tags: [{
            type: String,
            lowecase: true
        }]
    }
    
})

module.exports = mongoose.model("JobProfile", JobProfileSchema)