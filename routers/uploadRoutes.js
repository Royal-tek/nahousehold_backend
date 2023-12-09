const {uploadImage} = require("../controllers/uploadController")
const router = require("express").Router()
const { isAuthenticated} = require("../middlewares/auth")


router.post("/upload-image", isAuthenticated, uploadImage)

module.exports = router