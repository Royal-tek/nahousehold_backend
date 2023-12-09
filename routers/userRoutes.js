const express = require("express")
const router = express.Router()
const {getUser} = require("../controllers/userController")
const {isAuthenticated} = require("../middlewares/auth")


router.get("/get-user", isAuthenticated, getUser)

module.exports = router