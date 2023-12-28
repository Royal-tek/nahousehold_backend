const Ad = require("../models/Ads")
const User = require("../models/User")


exports.createAd = async (req, res)=>{
    const {id} = req.user
    try {
        const checkUser = await User.findById(id)
        if(!checkUser) return res.status(400).json({error: "User not found"})

        const createAd = new Ad({
            postedBy: checkUser._id,
            ...req.body
        })

        await createAd.save()
        res.status(200).json(createAd)
    } catch (error) {
        res.status(500).json({error: error})
        console.log(error);
    }
}

exports.editAd = async(req, res)=>{
    const {id} = req.user
    const { adId } = req.params
    try {
        const checkUser = await User.findById(id)
        if(!checkUser) return res.status(400).json({error: "User not found"}) 

        const updateAd = await Ad.findByIdAndUpdate(adId, {
            $set: {...req.body}
        },
        {
            new: true
        })

        res.status(200).json(updateAd)
    } catch (error) {
        res.status(500).json({error: error})
        console.log(error);
    }
}

exports.getAllAds = async(req, res)=>{
    try {
        const allAds = await Ad.find().populate("postedBy")
        res.status(200).json(allAds)
    } catch (error) {
        res.status(500).json({error: error})
        console.log(error);
    }
}

exports.getAdById = async (req, res)=>{
    const { adId } = req.params
    try {
        const getAd = await Ad.findById(adId)
        res.status(200).json(getAd)
    } catch (error) {
        res.status(500).json({error: error})
        console.log(error);
    }
}

exports.deleteAd = async(req, res)=>{
    const { adId } = req.params
    try {
        const delAd = await Ad.findByIdAndDelete(adId)
        res.status(200).json({message: "Ad deleted Successfully", delAd})
    } catch (error) {
        res.status(500).json({error: error})
        console.log(error);
    }
}

exports.getUserAdverts = async(req, res)=>{
    const { id } = req.user
    try {
        const checkUser = await User.findById(id)
        if(!checkUser) return  res.status(400).json({ error: "User not found"})

        const getAllAds = await Ad.find({ postedBy: checkUser._id})
        if(getAllAds.length == 0) return res.status(400).json({ error: "No Ads found for user"})

        res.status(200).json(getAllAds)
        
    } catch (error) {
        res.status(500).json({error: error})
        console.log(error);
    }
}