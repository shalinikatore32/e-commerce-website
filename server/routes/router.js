require('dotenv').config();
const express=require('express');
const router=express.Router();
const user=require('../models/user-model');
const validate=require('../vaildators/user-validator');
const {validateSchema,validateLoginSchema}=require('../validate/validate-user');
// const authcontroller=require('../controller/authmiddleware');
const authmiddleware = require('../controller/authmiddleware');
const placeOrder=require('../models/order-model');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const transporter = require('../utils/sendEmail'); // Adjust the path as needed
const crypto = require('crypto');

// It is a registration route
router.route('/register').post(validate(validateSchema),async (req,res)=>{
    const {username,email,password,isAdmin,resetPasswordToken,resetPasswordExpires}=req.body; 
    const userExist=await user.findOne({email:email});
    

    if(userExist){
       return res.status(409).json({message:"User already exist"});
    }
    
        const userCreate=await user.create({username,email,password,isAdmin,resetPasswordToken,resetPasswordExpires});
        // after the user successfully registered the token generated would be sent in the respons to the user
      
        return res.status(200).json({message:"User registerd successfully",
            token:await userCreate.generateToken()

        });   
});


// Login route
router.route('/login').post(validate(validateLoginSchema), async (req,res)=>{

    try{
const {email,password}=req.body;
const userEx=await user.findOne({email:email});
if(!userEx)
{
    return res.status(400).json({msg:"Invalid credentials"});
}
// const compass=await bcrypt.compare(password,userEx.password);
const compass=await userEx.comparePass(password);



if(compass){
    // after the user successfully logged in the token generated would be sent in the respons to the user
    return res.status(200).json({msg:"user logged in successfully",
    token:await userEx.generateToken(),
    // userId:userEx._id.toString()
});
}

else{
    return res.status(401).json({msg:"invalid email or password"});
}
    }
    catch(err){
console.log(err);
    }

})


// user logic

router.route('/user').get(authmiddleware,  async (req,res)=>{

    try {
        const userData=await req.user;
        console.log(userData);
        return res.status(200).json({userData});
      
    } catch (error) {
        
        console.log(`error from server ${error}`);

    }
});

router.route('/order').post(authmiddleware,async (req,res)=>{
try {
    const data=req.body;
    console.log(data);
    const dataResp=await placeOrder.create(data);

    return res.status(200).json({message:"Order placed Successfully"});

} catch (error) {
    console.log(error)
}


})

router.route('/create-payment-intent').post(async (req,res)=>{
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

router.route('/get-receipt/:paymentIntentId').get(async (req, res) => {
    try {
        const { paymentIntentId } = req.params;


        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

       
        if (paymentIntent && paymentIntent.charges && paymentIntent.charges.data.length > 0) {
            const receiptUrl = paymentIntent.charges.data[0].receipt_url;
            res.status(200).json({ receipt_url: receiptUrl });
        } else {
            res.status(404).json({ error: 'No charges found for this PaymentIntent' });
        }
    } catch (error) {
        console.error('Error retrieving payment intent:', error);
        res.status(500).json({ error: error.message });
    }
})


router.route('/forgot-password').post( async (req, res) => {
    const { email } = req.body;

    console.log(email);
  
    try {
      const userCheck = await user.findOne({ email });
      if (!userCheck) {
        return res.status(404).send('User not found');
      }
  
      const resetToken = userCheck.generatePasswordReset();
      await userCheck.save();
  
      const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
  
      await transporter.sendMail({
        to: userCheck.email,
        subject: 'Password Reset Request',
        text: `Please click on the following link to reset your password: ${resetUrl}`,
      });
  
      res.status(200).send('Reset password link sent to your email');
    } catch (err) {
      console.error('Error in forgot password route:', err);
      res.status(500).send('Error sending reset password email');
    }
  });
  
  // Reset password route
  router.route('/reset-password/:token').post(async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    try {
      const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
      const userCheck = await user.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() },
      });
  
      if (!userCheck) {
        return res.status(400).send('Invalid or expired token');
      }
  
      userCheck.password = password;
      userCheck.resetPasswordToken = undefined;
      userCheck.resetPasswordExpires = undefined;
      await userCheck.save();
  
      res.status(200).send('Password reset successful');
    } catch (err) {
      console.error('Error in reset password route:', err);
      res.status(500).send('Error resetting password');
    }
  });

module.exports=router;