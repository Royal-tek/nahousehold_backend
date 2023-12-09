const {uploadFunc} = require("../services/upload")
const { formidable } = require("formidable")
const {genearateString} = require("../helpers/genId")
const User = require("../models/User")

const form = formidable({ multiples: true})

const uploadImage = async(req, res)=>{
    try {
        const {id} = req.user
        const checkUser = await User.findById(id)
        if(!checkUser) return res.status(400).json({ error: "User not found"})

        const urls = []
        
        form.parse(req, async(err, fields, files)=>{
            if(err){
                next(err);
                return
            }

            if(!files.image || !Array.isArray(files.image)){
                return res.status(400).json({ error: "Image files are missing"})
            }

            const uploadedPromises = files.image.map(async (file)=>{
                const uniqueString = genearateString({ length : 15})
                const { url , error} = await uploadFunc(file.filepath, uniqueString)
                if(error){
                    return res.status(500).json({error: "Something went wrong"})
                }
                urls.push(url)
            })
            await Promise.all(uploadedPromises)
            const filteredUrl = urls.filter((url => url!== null))
            res.status(200).json(filteredUrl)

        })



    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
}

module.exports = {uploadImage}