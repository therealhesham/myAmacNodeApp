const express = require("express")
const jwt =require("jsonwebtoken")

appDelete = express()


const { previewStoreSchema } = require("./storepreview");

appDelete.post("/delete",(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", process.env.URL);
    res.header({"Access-Control-Allow-Credentials": true});
    res.header("Access-Control-Max-Age", 24*60*60*1000);
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

    const sender = req.cookies.token
  // console.log(sender)
  if(!sender) return res.send("not authenticated");
  const decoder =  jwt.verify(sender,process.env.MYSECRET)
  
if(!decoder) return res.send("not authenticated");
if(!decoder.isAdmin) return res.send("not authenticated");
next()}

,async(req,res)=>{

const id =req.body.id;

const delet = await previewStoreSchema.findByIdAndDelete(id)

res.send(delet)

})

module.exports.expressApp = express
module.exports.appDelete = appDelete