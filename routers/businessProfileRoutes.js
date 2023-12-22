const express = require("express")
const { Router } = express
const router = Router()
const {createProfile, getProfile, updateProfile, getProfileById} = require("../controllers/businessProfileController")
const {isAdmin, isAuthenticated} = require("../middlewares/auth")

router.post("/create-profile", isAuthenticated, createProfile )


router.get("/get-profile", isAuthenticated, getProfile )


router.get("/get-profile/:id", isAuthenticated, getProfileById )

router.put("/update-profile", isAuthenticated, updateProfile )


module.exports = router