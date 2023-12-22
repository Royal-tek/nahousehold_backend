const jwt = require("jsonwebtoken")
const otpGenerator = require("otp-generator")


exports.generateToken = (id)=>{
    const payload = {
        user: {id}
    }
    const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, { expiresIn: "3d"})
    return token
}

exports.resetPasswordToken = (id)=>{
    const payload = {
        user: {id}
    }
    const token = jwt.sign(payload, process.env.RESET_SECRET_KEY, { expiresIn: "3d"})
    return token
}

exports.decodeToken = (token, secret) =>{
    const decoded = jwt.decode(token, secret)
    return {user: decoded.user}
}

exports.generateOtp = (length)=>{
    const otp = otpGenerator.generate(length, {
        digits: true,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
    })
    return otp
}