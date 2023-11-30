const express = require("express")
const router = express.Router()
const {searchWithTagAndLocation, searchWithCategory} = require("../controllers/searchController.")



router.get("/", searchWithTagAndLocation)

router.get("/:categoryId", searchWithCategory)


module.exports = router