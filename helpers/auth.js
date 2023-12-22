const bcrypt = require("bcrypt")


exports.encrypt = async (value)=>{
    const salt = await bcrypt.genSalt(10)
    
    return await bcrypt.hash(value, salt)
}

exports.compare = async (newValue, oldValue)=>{
    return await bcrypt.compare(newValue, oldValue)
}