const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AdSchema = new Schema({
    postedBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [{
        type: String
    }],
    price: {
        type: Number,
        required: String
    },
    sponsored: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Ads", AdSchema)