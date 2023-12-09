const express = require("express");
const dotenv = require("dotenv").config()
const port = process.env.PORT
const connectDB = require("./config/db")
const authRoutes = require("./routers/authRoutes")
const userRoutes = require("./routers/userRoutes")
const searchRoutes = require("./routers/searchRoutes")
const categoryRoutes = require("./routers/categoryRoutes")
const businessProfileRoutes = require("./routers/businessProfileRoutes")
const uploadRoutes = require("./routers/uploadRoutes")
const cors = require("cors")
const cloudinary = require("cloudinary")



// app init
const app = express()

// init middleware
app.use(express.json())
app.use(cors())

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
    });




// Routes
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/search", searchRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/business-profile", businessProfileRoutes)
app.use("/api/upload", uploadRoutes)


// connect DB
connectDB()



app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})