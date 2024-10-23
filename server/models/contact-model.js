const mongoose=require('mongoose');


const createContactModel=new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})

const createContact=new mongoose.model('contacts',createContactModel);
module.exports=createContact;