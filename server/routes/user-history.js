const express=require('express');
const userHistoryRoute=express.Router();
const authMiddleware=require('../controller/authmiddleware')

const orderModel=require('../models/order-model');

userHistoryRoute.route('/fetch/user/history/:email').get(authMiddleware,async (req,res)=>{
   try {
    const email=req.params.email;
    const data=await orderModel.find({email:email});
    
    if(data){
        return res.status(200).json(data);
    }
    return res.status(403).json({message:"No history found"});
    
   } catch (error) {
    console.log(error);
   }
    
})

module.exports=userHistoryRoute;