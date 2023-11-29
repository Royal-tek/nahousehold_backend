const Category = require("../models/Categories")
const User = require("../models/User")

exports.createCategory = async (req, res)=>{
    const {id} = req.user

    try {
        const checkUser = await User.findById(id)
        if(!checkUser) return res.status(400).json({error: "User not found"})
        const createCat = new Category({...req.body})
        await createCat.save()

        res.status(200).json({message: "Category Created Successfully", createCat})
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
}