
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
const { MiddleWareFunctionForLogin } = require("../app");

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
        var pairs = req.headers.cookie.split(';')

        var cookies = {};
        for (var i = 0; i < pairs.length; i++) {
           var nameValue = pairs[i].split('=');
           cookies[nameValue[0].trim()] = nameValue[1];
        }
        
        
        const sender = cookies.token
        
        const decoder = jwt.verify(sender,process.env.MYSECRET)
        
        const data = new notifiy({
            sender:decoder.firstName,
            firstName:req.body.firstName,
            message:req.body.message,socketID:req.body.id
        ,
        title:req.body.title
    })
        
        const saver = await data.save()
       

                res.send(saver)
    } catch (error) {
        console.log(error)
    }
     
       
})

appGettUser.get("/requests",MiddleWareFunctionForLogin,async (req,res)=>{
    var pairs = req.headers.cookie.split(';')

        var cookies = {};
        for (var i = 0; i < pairs.length; i++) {
           var nameValue = pairs[i].split('=');
           cookies[nameValue[0].trim()] = nameValue[1];
        }
        
        
        const sender = cookies.token
        
        const decoder = jwt.verify(sender,process.env.MYSECRET)

const notifications = await notifiy.find({firstName:decoder.firstName});

res.send(notifications)


})
appGettUser.get("/falserequests",async (req,res)=>{
console.log(req.path)
try{
    var pairs = req.headers.cookie.split(';')

        var cookies = {};
        for (var i = 0; i < pairs.length; i++) {
           var nameValue = pairs[i].split('=');
           cookies[nameValue[0].trim()] = nameValue[1];
        }
        
        
        const sender = cookies.token
        
        const decoder = jwt.verify(sender,process.env.MYSECRET)
        
const notifications = await notifiy.find({firstName:decoder.firstName});

    
    res.send(notifications)
    
    }catch(error){
console.log("error from token Getter")
        
    }
    })








module.exports.userList = appGettUser
module.exports.sockets = sockets