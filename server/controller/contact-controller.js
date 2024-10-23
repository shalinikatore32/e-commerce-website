const contactModel=require('../models/contact-model');

const contactForm=async (req,res)=>{
   
        try {
            const data=req.body;
            await contactModel.create(data);
            return res.status(200).json({message:"Data sent successfully"});
        } catch (error) {
            return res.json({message:error});
        }
  
}

module.exports=contactForm;