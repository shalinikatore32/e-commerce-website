const express=require('express');
const route=express.Router();
const createContact=require('../models/contact-model');

route.route('/contact').post(async (req,res)=>{

try {
    const {fname,email,message}=req.body;
    const useCreate=await createContact.create({fname,email,message});
    if(useCreate){
        return res.status(200).json({message:"Data sent successfully"});
    }
    return res.status(400).json({message:"Something went wrong"});


} catch (error) {
    console.log(error);
}
})

module.exports=route;