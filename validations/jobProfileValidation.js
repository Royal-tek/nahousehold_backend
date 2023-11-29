const z = require("zod")

exports.jobProfileSchema = z.object({
    personal: z.object({
        gender: z.enum(['MALE', 'FEMALE']),
        state: z.string()
    }),
    business: z.object({
        businessName: z.string(),
        field: z.string(),
        tags: z.string().array()
    })
}).strict()