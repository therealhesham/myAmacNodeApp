const express = require("express");
const jwt =require("jsonwebtoken")
const { schemaimport } = require("./exectionvalidator");

const { mongoosetransaction, previewStoreSchema } = require("./storepreview");
// const Fawn = require("fawn")

appThirdTransaction = express();

const thirdModel = mongoosetransaction.model("thirdtransaction",new mongoosetransaction.Schema(
    {
        
from:"string",
to:{type:"string",required:true},

transaction:{type:"string"},
receiptno:"string",
quantity:{type:"number",required:true},
items:{type:"string",required:true},
unit:{type:"string"},

date:{type:"string"},
user:"string"
})

)
appThirdTransaction.post("/thirdtransaction",(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "https://my-amac-react-app.vercel.app");
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

,async(req,res)=>{

const savesecondmodel = new thirdModel({
    transaction:"تحويل",
from:req.body.from,
to:req.body.to,
receiptno:req.body.receiptno,

quantity:req.body.quantity,
items:req.body.items,
unit:req.body.unit,
date:req.body.date,
user:req.body.user
})

 const findByID = await previewStoreSchema.findOne({store:savesecondmodel.from,
    items:savesecondmodel.items
    })
    
const findByIDinc = await previewStoreSchema.findOne({store:savesecondmodel.to,
        items:savesecondmodel.items
        })
const quuant = findByID.quantity - savesecondmodel.quantity;
if (findByID.type !== savesecondmodel.unit ) return res.send("error");
if (findByIDinc.type   !== savesecondmodel.unit ) return res.send("error");
if (quuant < 0 ) return res.send("error")
  if(findByID.quantity <= 0)  return res.send("error")
if (savesecondmodel.quantity > findByID.quantity )return res.send("error")
const updatedDec = await previewStoreSchema.findByIdAndUpdate(findByID._id,{"$inc":{quantity:- savesecondmodel.quantity}})
  const updatedInc = await previewStoreSchema.findByIdAndUpdate(findByIDinc._id,{"$inc":{quantity:+ savesecondmodel.quantity}})
const saver = await savesecondmodel.save()

  res.send(saver)
        
    

    
})
appSecondTransaction.get("/getthirdtransactions",(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "https://my-amac-react-app.vercel.app");
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

,async(req,res)=>{
    try {
        const sender = req.cookies.token
        
    
            const decoder = jwt.verify(sender,process.env.MYSECRET)
        const finder = await thirdModel.find();
        res.send(finder)
  
     
      
      } catch (error) {
        res.send("not authenticated")
      }
      
    
    })
    appSecondTransaction.get("/deletethirdtransaction/:id",(req,res,next)=>{
        res.header("Access-Control-Allow-Origin", "https://my-amac-react-app.vercel.app");
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
    
    ,async(req,res)=>{
    
        const id =req.params.id;
        console.log(id)
        await thirdModel.findByIdAndDelete(id)
        res.send("deleted")
        
        
        
        
        })
    
module.exports.appThirdTransaction = appThirdTransaction