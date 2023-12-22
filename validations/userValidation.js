const z = require("zod")

exports.userSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phoneNumber: z.string().min(10),
    password: z.string().min(5)
}).strict()

exports.loginUserSchema = z.object({
    email: z.string(),
    password: z.string()
}).strict()

exports.forgotPasswordSchema = z.object({
    email: z.string()
})

exports.verifyforgotPasswordOtpSchema = z.object({
    email: z.string(),
    otp: z.string().min(4)
})

exports.changeResetPasswordSchema = z.object({
    token: z.string(),
    password: z.string().min(5)
})