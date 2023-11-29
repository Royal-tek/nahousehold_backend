const express = require("express")
const { Router } = express
const router = Router()
const {createCategory} = require("../controllers/categoriesController")
const {isAdmin, isAuthenticated} = require("../middlewares/auth")

router.post("/create-category", isAuthenticated, isAdmin, createCategory )




module.exports = router