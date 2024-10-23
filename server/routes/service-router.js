const express=require('express');
const contactRoute=express.Router();
const createService=require('../models/service-model');

contactRoute.route('/service').get(async (req,res)=>{

try {
 const resp=await createService.find();
 if(!resp){
    return res.status(404).json({msg:"No Service was found"});
 }
 console.log(resp);
 return res.status(200).json({resp});


} catch (error) {
    console.log(error);
}
})

module.exports=contactRoute;