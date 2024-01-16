const User = require("../models/User")

exports.getAllUsers = async(req, res)=>{
    try {
        const { id } = req.user

        const checkUser = await User.findById(id)
        if(!checkUser) return res.status(400).json({ error: "No User Found"})
        if(!checkUser.isAdmin) return res.status(400).json({ error: "Only Admins can perfomr this action"})

        const allUsers = await User.find()
        res.status(200).json(allUsers)

    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
}