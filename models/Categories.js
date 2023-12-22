const mongoose = require("mongoose")
const { Schema, model } = mongoose

const CategoriesSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = model("Categories", CategoriesSchema)