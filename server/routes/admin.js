const express =require('express');
const router=express.Router();
const userModel=require('../models/user-model');
const contactModel=require('../models/contact-model');
const authmiddleware=require('../controller/authmiddleware');
const adminMiddleware=require('../controller/admin-middleware');
const orderModel=require('../models/order-model');

router.route('/users').get(authmiddleware,adminMiddleware, async (req,res)=>{

    try {
        const data=await userModel.find().select({
            password:0,
        });
        if(!data || data.length===0)
            {
                return res.status(404).json({message:"No user found"});
            }
    
            
            return res.status(200).json({data});
    } catch (error) {
        next(error);
    }

});

/**
 * contacts admin panel
 */

router.route('/contacts').get(authmiddleware,adminMiddleware, async (req,res)=>{

    try {
        const contactData=await contactModel.find();
        if(!contactData || contactData.length===0)
        {
            return res.status(404).json({message:"No contacts found"});
        }
        console.log(contactData);
        return res.status(200).json({contactData});
    } catch (error) {
        next(error);
    }

});
//get order 
router.route('/users/order').get(authmiddleware,adminMiddleware,async (req,res)=>{
    const data=await orderModel.find().select({
        product_price:0,
    })
    console.log(data);
    if(!data || data.length===0)
    {
        return res.status(403).json({message:"Order not found"});
    }
    return res.status(200).json(data);
})
//get users by id

router.route('/users/:id').get(authmiddleware,adminMiddleware,async (req,res)=>{

    try {
    
        const id=req.params.id;
        console.log(id);
        const userGet=await userModel.findOne({_id:id}).select({
            password:0,
        });
       
            res.status(200).json({userGet});
        
    
    } catch (error) {
        next(error);
    }



})

//update user by id

router.route('/users/update/:id').patch(authmiddleware,adminMiddleware,async (req,res)=>{

try {
    const id=req.params.id;
const updateuserData=req.body;
const updatedUser=await userModel.updateOne(
    {_id:id},
    {
        $set:updateuserData
    }
);
return res.status(200).json({updatedUser});

} catch (error) {
    next(error);
}
})

// Delete user by admin

router.route('/users/delete/:id').delete(authmiddleware, adminMiddleware,async (req, res)=>{
try {
    
    const id=req.params.id;
    const userDelete=await userModel.deleteOne({_id:id});
    if(userDelete)
    {
        res.status(200).json({message:"User Deleted Successfully"});
    }

    else{
        res.status(403).json({message:"something went wrong"});
    }

} catch (error) {
    next(error);
}
});

// Contact Deleted by admin

router.route('/contacts/delete/:id').delete(authmiddleware, adminMiddleware,async (req, res)=>{
try {
    
    const id=req.params.id;
    const contactDelete=await contactModel.deleteOne({_id:id});
    if(contactDelete)
    {
        res.status(200).json({message:"Contact Deleted Successfully"});
    }

    else{
        res.status(403).json({message:"something went wrong"});
    }

} catch (error) {
    next(error);
}
});
module.exports=router;