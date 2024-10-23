const cors=require('cors');
const express=require('express');
const server=express();
const route=require('./routes/router');
const connection=require('./db-connection/Connect');
const {errorHandle}=require('./vaildators/error-handle');
const createContact=require('./routes/contact-route');
const serviceRoute=require('./routes/service-router');
const userRoute=require('./routes/admin');
const userHistoryRoute=require('./routes/user-history');
const userDataRoute=require('./routes/user-dashboard');
  
const corsOptions = {
    origin: 'http://localhost:5173',
    methods:'POST,GET,PUT,DELETE,PATCH,HEAD',
    credentials:true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
server.use(cors(corsOptions))


server.use(express.json());
server.use('/',route);
server.use('/',createContact);
server.use('/',serviceRoute);
server.use('/admin',userRoute);
server.use('/',userHistoryRoute);
server.use('/',userDataRoute);


connection().then(()=>{
    console.log("Your database connected");
}).catch((err)=>{
    console.log(err);
});

server.use(errorHandle);
server.listen(5005,()=>{
    console.log("You have successfully created the server");

});