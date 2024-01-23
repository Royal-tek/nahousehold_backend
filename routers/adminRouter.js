const router = require("express").Router()
const {isAuthenticated, isAdmin} = require("../middlewares/auth")
const {getAllUsers, getAllAds} = require("../controllers/adminController")


router.get("/all-users", isAuthenticated, isAdmin, getAllUsers)

router.get("/all-ads", getAllAds)

module.exports = router