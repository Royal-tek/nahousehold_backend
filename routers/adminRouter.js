const router = require("express").Router()
const {isAuthenticated, isAdmin} = require("../middlewares/auth")
const {getAllUsers} = require("../controllers/adminController")


router.get("/all-users", isAuthenticated, isAdmin, getAllUsers)

module.exports = router