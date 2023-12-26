const router = require("express").Router()
const {isAdmin, isAuthenticated} = require("../middlewares/auth")
const { createAd, editAd, getAllAds, getAdById, deleteAd, getUserAdverts } = require("../controllers/AdController")


router.post("/post-ad", isAuthenticated, createAd)

router.put("/edit-ad/:adId", isAuthenticated, editAd)

router.get("/get-ads", getAllAds)

router.get("/get-user-ads", isAuthenticated, getUserAdverts)

router.get("/:adId", getAdById)

router.delete("/:adId", deleteAd)



module.exports = router