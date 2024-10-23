const {Schema, model}=require('mongoose');

const service=new Schema({
    
category:{
type:String,
required:true
},
product_name:{
    type:String,
    required:true

},
product_price:{
type:String,
required:true
},
product_description:{
  type:String,
  required:true
},
image:{
  type:String,
  required:true
}
});

const serviceModel=new model('Service',service);

module.exports=serviceModel;