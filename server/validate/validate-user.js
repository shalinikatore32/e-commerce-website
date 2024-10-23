const {z}=require('zod');
//zod validation 

const validateLoginSchema=z.object({
    email:z.string({required_error:"email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(6,{message:"email must be of at least 3 characters"})
    .max(255,{message:"you can enter an username of 255 chars at most"}),

    password:z.string({required_error:"password is required"})
    .trim()
    .min(8,{message:"password must be of at least 8 characters"})
    .max(24,{message:"you can enter an username of 20 chars at most"}),


})

const validateSchema=z.object({
    username:z.string({required_error:"Username is required"})
    .trim()
    .min(3,{message:"username must be of at least 3 characters"})
    .max(20,{message:"you can enter an username of 20 chars at most"}),

    email:z.string({required_error:"email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(6,{message:"email must be of at least 3 characters"})
    .max(255,{message:"you can enter an username of 255 chars at most"}),

    password:z.string({required_error:"password is required"})
    .trim()
    .min(8,{message:"password must be of at least 8 characters"})
    .max(24,{message:"you can enter an username of 20 chars at most"}),


    

});

module.exports={validateSchema,validateLoginSchema};