const z = require("zod")

exports.jobProfileSchema = z.object({

    gender: z.enum(['MALE', 'FEMALE']),
    state: z.string(),
    businessName: z.string(),
    // field: z.string(),
    tags: z.string().array(),
    images: z.string().array()
}).strict()

exports.jobProfileUpdateSchema = z.object({
    gender: z.enum(['MALE', 'FEMALE']).optional(),
    state: z.string().optional(),
    businessName: z.string().optional(),
    // field: z.string().optional(),
    tags: z.string().array().optional(),
    images: z.string().array().optional()

})