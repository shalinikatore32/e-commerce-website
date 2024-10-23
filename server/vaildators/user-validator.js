const schema=require('../validate/validate-user');
const validate=(schema)=>async (req,res,next)=>{
    try {
       const parsBody= await schema.parseAsync(req.body);
       console.log(parsBody);
       req.body=parsBody;
       next();

    } catch (error) {
        const status=422;
        const message="fill the input properly";
        const extraDetails=error.errors ? error.errors[0].message : error.message;

        const err={
            status,
            message,
            extraDetails
        }
        console.log(err);
        next(err);
    }

}
module.exports=validate;