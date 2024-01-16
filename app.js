const express = require("express");
const http = require("http")
const socketio = require("socket.io")
const dotenv = require("dotenv").config()
const port = process.env.PORT
const connectDB = require("./config/db")
const authRoutes = require("./routers/authRoutes")
const userRoutes = require("./routers/userRoutes")
const searchRoutes = require("./routers/searchRoutes")
const categoryRoutes = require("./routers/categoryRoutes")
const businessProfileRoutes = require("./routers/businessProfileRoutes")
const AdRoutes = require("./routers/AdRouter")
const uploadRoutes = require("./routers/uploadRoutes")
const adminRoutes = require("./routers/adminRouter")
const cors = require("cors")
const cloudinary = require("cloudinary");
const {initializeSocket} = require('./socket')


// app init
const app = express()

// init middleware
app.use(express.json())
app.use(cors())

const server = http.createServer(app)




app.get("/", (req, res)=>{
    res.send("Welcome to Nahousehold")
})



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
app.use("/api/ads", AdRoutes)
app.use("/api/admin", adminRoutes)


// connect DB
connectDB()



server.listen(port, ()=>{
    initializeSocket(server)
    console.log(`Server running on port ${port}`);
})