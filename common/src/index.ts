import zod from "zod";

export const SignInInputZodShema = zod.object({
    email: zod.string().email(),
    name: zod.string(),
    password: zod.string()
})

export const SignUpInputZodShema = zod.object({
    email: zod.string().email(),
    password: zod.string()
})


export const CreatePostZodShema = zod.object({
    title: zod.string(),
    content: zod.string(),
    published: zod.boolean().optional().default(false)
})


export const UpdatePostZodShema = zod.object({
    title: zod.string().optional(),
    content: zod.string().optional(),
    published: zod.boolean().optional()
})


export type SignInType = zod.infer<typeof SignInInputZodShema> 
export type SignUpType = zod.infer<typeof SignUpInputZodShema> 
export type CratePostType = zod.infer<typeof CreatePostZodShema> 
export type UpdatePostType = zod.infer<typeof UpdatePostZodShema>