const User = require("../models/User")


exports.getUser = async(req, res)=>{
    const {id} = req.user
    try {
        const checkUser = await User.findById(id).select('-password')
        if(!checkUser) return res.status(400).json({ error: "User not Found"})

        res.status(200).json(checkUser)

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}