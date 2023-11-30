const express = require("express");
const dotenv = require("dotenv").config()
const port = process.env.PORT
const connectDB = require("./config/db")
const authRoutes = require("./routers/authRoutes")
const searchRoutes = require("./routers/searchRoutes")
const categoryRoutes = require("./routers/categoryRoutes")
const businessProfileRoutes = require("./routers/businessProfileRoutes")
const cors = require("cors")



// app init
const app = express()

// init middleware
app.use(express.json())
app.use(cors())
// Routes
app.use("/api/auth", authRoutes)
app.use("/api/search", searchRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/business-profile", businessProfileRoutes)


// connect DB
connectDB()



app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})