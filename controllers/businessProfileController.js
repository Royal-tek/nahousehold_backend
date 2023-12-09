const JobProfile = require("../models/JobProfile")
const User = require("../models/User")
const Category = require("../models/Categories")
const {jobProfileSchema, jobProfileUpdateSchema} = require("../validations/jobProfileValidation")


exports.savePersonalInfo = async(req, res)=>{
    const { id } = req.user
    try {
        const checkUser = await User.findById(id)
        if(!checkUser) return res.status(400).json({error: "User not found"})

        const createProfile = new JobProfile({
            user: checkUser._id,
            ...req.body
        })
        await createProfile.save()

        res.status(200).json({message: "Profile personal information saved successfully", createProfile})


    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}


exports.createProfile = async(req, res)=>{
    const body = jobProfileSchema.safeParse(req.body)
    if (!body.success) {
        return res.status(400).json({
            errors: body.error.issues,
        });
    }

    try {
        const {id} = req.user
        const {field} = body.data
        const checkUser = await User.findById(id)
        if(!checkUser) return res.status(400).json({error: "User not found"})

        const checkCategory = await Category.findById(field)
        if(!checkCategory) return res.status(400).json({error: "Invalid Category"})

        const checkIfProfileExists = await JobProfile.findOne({ user: checkUser._id})
        if(checkIfProfileExists) return res.status(400).json({error: "Profile already exists for user"})

        const createProfile = new JobProfile({
            user: checkUser._id,
            field: checkCategory._id,
            ...body.data
        })
        await createProfile.save()

        res.status(200).json({message: "Profile created successfully", createProfile})

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

exports.getProfile = async (req, res)=>{
    const {id} = req.user
    try {
        const getProfile = await JobProfile.findOne({ user: id }).populate("field")
        if(!getProfile) return res.status(400).json({ error: "Profile not found"})

        res.status(200).json(getProfile)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

exports.updateProfile = async (req, res)=>{
    const body = jobProfileUpdateSchema
    .safeParse(req.body)

    if (!body.success) {
        return res.status(400).json({
            errors: body.error.issues,
        });
    }
    const {id} = req.user
    try {
        const checkUser = await User.findById(id)
        if(!checkUser) return res.status(400).json({ error: "User not found"})
        console.log(body.data);
        const updateProfile = await JobProfile.findOneAndUpdate({user: checkUser._id}, 
            {
                $set: {...body.data}
            },
            {
                new: true
            })
            res.status(200).json(updateProfile)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}