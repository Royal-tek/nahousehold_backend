const express = require("express")
const { Router } = express
const router = Router()
const {createCategory, getCategories} = require("../controllers/categoriesController")
const {isAdmin, isAuthenticated} = require("../middlewares/auth")

router.post("/create-category", isAuthenticated, isAdmin, createCategory )

router.get("/get-categories", getCategories )




module.exports = router