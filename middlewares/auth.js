const jwt = require("jsonwebtoken")
const User = require("../models/User")

exports.isAuthenticated = async (req, res, next)=>{
    let token;
    if(req.headers["authorization"] && req.headers["authorization"].split(" ")[0] === "Bearer"){
        token = req.headers["authorization"].split(" ")[1]
    }
    try {
        if(!token) return res.status(400).json({error: "You are not authenticated"})
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        req.user = decoded.user
        next()
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

exports.isAdmin = async(req, res, next)=>{
    try {
        const { id } = req.user
        const checkIfAdmin = await User.findById(id)
        if(!checkIfAdmin.isAdmin) return res.status(400).json({error: "You are not allowed to perform this action"})
        next()
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}