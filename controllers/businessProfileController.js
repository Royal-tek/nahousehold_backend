const JobProfile = require("../models/JobProfile")
const User = require("../models/User")
const Category = require("../models/Categories")
const {jobProfileSchema, jobProfileUpdateSchema} = require("../validations/jobProfileValidation")




exports.createProfile = async(req, res)=>{
    const body = jobProfileSchema.safeParse(req.body)
    if (!body.success) {
        return res.status(400).json({
            errors: body.error.issues,
        });
    }

    try {
        const {id} = req.user
        const checkUser = await User.findById(id)
        if(!checkUser) return res.status(400).json({error: "User not found"})

        const checkIfProfileExists = await JobProfile.findOne({ user: checkUser._id})
        if(checkIfProfileExists) return res.status(400).json({error: "Profile already exists for user"})

        const createProfile = new JobProfile({
            user: checkUser._id,
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
        if(!getProfile) return res.status(404).json({ error: "Profile not found"})

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

exports.getProfileById = async(req, res)=>{
    const { id } = req.params
    try {
        const getProfile = await JobProfile.findById(id).populate("user").populate("field")
        console.log(getProfile);
        if(!getProfile) return res.status(400).json({error: "Profile not found"})

        getProfile.profileViews += 1
        await getProfile.save()

        res.status(200).json(getProfile)
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
}