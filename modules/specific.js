

const express = require("express");
const jwt =require("jsonwebtoken")
const { previewStoreSchema } = require("./storepreview");
const appSpecific = express();


appSpecific.post("/specificdata",(req,res,next)=>{
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
next()}

, async(req,res)=>{

try {
  const store = req.body.store;
  console.log(req.body);
  const finder =  await previewStoreSchema.find({store:store})
  res.send(finder)
} catch (error) {
  console.log(error);
}
  
})

appSpecific.post("/specificunit",(req,res,next)=>{
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
next()}

, async(req,res)=>{

    try {const items = req.body.items;
    const store=req.body.store
      const finder =  await previewStoreSchema.findOne({items:items,store:store})
      
      res.send(finder)
    } catch (error) {
      console.log(error);
    }
      
    })


module.exports.appSpecific=appSpecific;
