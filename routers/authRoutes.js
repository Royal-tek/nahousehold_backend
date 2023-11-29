const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const authMiddleWare = require("../middlewares/auth")


// Public Route
// For registering a new user
// api/auth/
router.post("/register", authController.createUser)

// Public Route
// For Logging in a user
// api/auth/
router.post("/login", authController.userLogin)

// Public Route
// For Forgot Password for a user
// api/auth/
router.post("/forgot-password", authController.forgotPassword)

// Public Route
// To verify the OTP for  Forgot Password for a user
// api/auth/
router.post("/verify-forgot-otp", authController.verifyForgotPasswordOtp)

// Public Route
// To Change user password from reset flow
// api/auth/
router.post("/reset-password", authController.resetPasswordFromResetFlow)


module.exports = router