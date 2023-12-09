const otp = require("otp-generator")

const genearateString = ({prefix="", suffix = "", length = ""}) =>{
    const value = otp.generate(length, {
        digits: false,
        lowerCaseAlphabets: true,
        upperCaseAlphabets: true,
        specialChars: false
    })

    return value
}

module.exports = {genearateString}