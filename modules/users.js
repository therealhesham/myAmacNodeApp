
const express = require("express")
const { loginHandleMongo, models } = require("./registeruser");
const _ = require("lodash");
const { mongoosetransaction } = require("./storepreview");
const { default: mongoose } = require("mongoose");
// const { io } = require("../app");
// const  io  = require("../app");
const jwt=require("jsonwebtoken");
require("dotenv").config()
const cookieParser = require("cookie-parser");


appGettUser = express();

const notifiy = mongoosetransaction.model("notification",new mongoosetransaction.Schema({sender:"string",
firstName :"string",
message:"string",socketID:"string",
isOk:{type:"Boolean",default:false}
,title:"String"
}))
const sockets = mongoosetransaction.model("socket",new mongoosetransaction.Schema({firstName:"string",socketID:"string"}))
 

appGettUser.use(cookieParser())
appGettUser.get("/cookire",(req,res)=>{
    var pairs = req.headers.cookie.split(';')

    var cookies = {};
    for (var i = 0; i < pairs.length; i++) {
       var nameValue = pairs[i].split('=');
       cookies[nameValue[0].trim()] = nameValue[1];
    }

    console.log(cookies)

})
appGettUser.post("/setter",async(req,res)=>{
const id =req.body.id
const ok = await notifiy.findByIdAndUpdate(id,{isOk:true})
res.send(ok)
})
appGettUser.post("/send",async (req,res)=>{
    try {
        
        
        const sender = req.cookies.token
        
        const decoder = jwt.verify(sender,process.env.MYSECRET)
        
        const data = new notifiy({
            sender:decoder.firstName,
            firstName:req.body.firstName,
            message:req.body.message
        ,
        title:req.body.title
    })
        
        const saver = await data.save()
       

                res.send(saver)
    } catch (error) {
        res.send("error")
    }
     
       
})

appGettUser.get("/requests"
// ,(req,res,next)=>{
//     res.header("Access-Control-Allow-Origin", process.env.URL);
//     res.header({"Access-Control-Allow-Credentials": true});
//     res.header("Access-Control-Max-Age", 24*60*60*1000);
//       res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

//     const sender = req.cookies.token
//   // console.log(sender)
//   if(!sender) return res.send("not authenticated");
//   const decoder =  jwt.verify(sender,process.env.MYSECRET)
  
// if(!decoder) return res.send("not authenticated");
// next()}
,
async (req,res)=>{
    
        
        const sender = req.cookies.token
    if(!sender)     return res.send("not Authenticated")
        const decoder = jwt.verify(sender,process.env.MYSECRET)

const notifications = await notifiy.find({firstName:decoder.firstName});

res.send(notifications)


})
appGettUser.get("/falserequests",(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", process.env.URL);
    res.header({"Access-Control-Allow-Credentials": true});
    res.header("Access-Control-Max-Age", 24*60*60*1000);
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

    const sender = req.cookies.token
  // console.log(sender)
  if(!sender) return res.send("deleted token");
  const decoder =  jwt.verify(sender,process.env.MYSECRET)
   
if(!decoder) return res.send("deleted token");
next()},async (req,res)=>{
    
    
    
try{
    const sender = req.cookies.token
    // if(!sender) return res.send("deleted token")
    const decoder = jwt.verify(sender,process.env.MYSECRET)
        

        
const notifications = await notifiy.find({firstName:decoder.firstName,isOk:false});

    
    res.send(notifications)
    
    }catch(error){
res.send("error from token Getter")
        
    }
    })








module.exports.userList = appGettUser
module.exports.sockets = sockets