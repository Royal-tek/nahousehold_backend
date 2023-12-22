const User = require("../models/User")
const hash = require("../helpers/auth")
const userValidation = require("../validations/userValidation")
const tokens = require("../helpers/token")

exports.createUser = async (req, res)=>{
    const body = userValidation.userSchema.safeParse(req.body)
    if (!body.success) {
        return res.status(400).json({
            errors: body.error.issues,
        });
    }
    const { email, phoneNumber, password } = body.data;

    try {
        const checkEmail = await User.findOne({email})
            if(checkEmail) return res.status(400).json({error: "Email is already in use"})
        const checkPhone = await User.findOne({phoneNumber})
            if(checkPhone) return res.status(400).json({error: "Phone number is already in use"})
        const hashedPwd = await hash.encrypt(password)
        
        const newUser = new User({
            ...body.data,
            password: hashedPwd
        })
        await newUser.save()
        res.status(200).json(newUser)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

exports.userLogin = async(req, res)=>{
    const body = userValidation.loginUserSchema.safeParse(req.body)
    if (!body.success) {
        return res.status(400).json({
            errors: body.error.issues,
        });
    }
    const {email, password} = body.data
    try {
        const checkEmail = await User.findOne({email})
            if(!checkEmail) return res.status(400).json({error: "Email or password incorrect"})
        const checkPassword = await hash.compare(password, checkEmail.password)
            if(!checkPassword) return res.status(400).json({error: "Email or password incorrect"})
        
        const token = tokens.generateToken(checkEmail._id)
        res.status(200).json({
            message: "Login Succesful",
            token: token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

exports.forgotPassword = async(req, res)=>{
    const body = userValidation.forgotPasswordSchema.safeParse(req.body)
    if (!body.success) {
        return res.status(400).json({
            errors: body.error.issues,
        });
    }
    const { email } = body.data
    try {
        const checkEmail = await User.findOne({email})
        if(!checkEmail) return res.status(400).json({error: "Email not found"})

        const otp = tokens.generateOtp(4)
        const hashedOtp = await hash.encrypt(otp)
        checkEmail.otp = hashedOtp
        checkEmail.otpExpiresIn = new Date().getTime()
        await checkEmail.save()

        res.status(200).json({otp: otp})

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

exports.verifyForgotPasswordOtp = async(req, res)=>{
    const body = userValidation.verifyforgotPasswordOtpSchema.safeParse(req.body)
    if (!body.success) {
        return res.status(400).json({
            errors: body.error.issues,
        });
    }
    const {email, otp} = body.data
    try {
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({error: "User not found"})

        const checkOtp = await hash.compare(otp, user.otp)
        if(!checkOtp) return res.status(400).json({error: "Otp is invalid"})

        const currentTime = new Date().getTime()
        const otpTime = user.otpExpiresIn
        const checkOtpTime = currentTime - otpTime

        if(checkOtpTime > 300000){
            return res.status(400).json({error: "Otp has expired"})
        }

        const token = tokens.resetPasswordToken(user._id)
        res.status(200).json({token: token, time: currentTime})
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

exports.resetPasswordFromResetFlow = async (req, res)=>{
    
    const body = userValidation.changeResetPasswordSchema.safeParse(req.body)
    if(!body.success){
        return res.status(400).json({
            errors: body.error.issues,
        });
    }
    const { token, password} = body.data
    try {

        const {user: userId, error} = tokens.decodeToken(token, process.env.RESET_SECRET_KEY)
        if(error) return res.status(400).json({error: "Invalid token"})
        
        const { id } = userId 

        const checkUser = await User.findById(id)
        if(!checkUser) return res.status(400).json({ error: "An error occured"})

        const checkPwd = await hash.compare(password, checkUser.password)
        if(checkPwd) return res.status(400).json({error: "New password cannot be the same as old password"})

        checkUser.password = password
        await checkUser.save()
        res.status(200).json({message: "Password changed successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}