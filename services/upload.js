const cloudinary = require("cloudinary").v2

const uploadFunc = async (image, str)=>{
    try {
        const config = {
            use_filename : true,
            unique_filename: false,
            overwrite: false,
            folder: `uploads/${str}/`,
        }

        const res = await cloudinary.uploader.upload(image, config)
        return { url: res.secure_url}

    } catch (error) {
        console.log(error);
    }

}

module.exports = {uploadFunc}