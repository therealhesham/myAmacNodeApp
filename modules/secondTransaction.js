const express = require("express");
const { schemaimport } = require("./exectionvalidator");
const jwt =require("jsonwebtoken")
const { mongoosetransaction, previewStoreSchema } = require("./storepreview");
// const Fawn = require("fawn")

appSecondTransaction = express();

const secondModel = mongoosetransaction.model("secondtransaction",new mongoosetransaction.Schema(
    {
        
transaction:"string",
receiptno:"string",
store:{type:"string",required:true},
typeOfImporter:{type:"string",required:true},
contractor:{type:"string"},
typeOfContracting:{type:"string"},

quantity:{type:"number",required:true},
items:{type:"string",required:true},
unit:{type:"string"},
location:{type:"string"},
date:{type:"string",default:new Date(Date.now()).toDateString()},
user:"string"
})

)
appSecondTransaction.post("/secondtransaction",async(req,res)=>{

const savesecondmodel = new secondModel({
    transaction:"منصرف",
store:req.body.store,
receiptno:req.body.receiptno,
typeOfImporter:req.body.typeOfImporter,
contractor:req.body.contractor,
typeOfContracting:req.body.typeOfContracting,

quantity:req.body.quantity,
items:req.body.items,
unit:req.body.unit,
location:req.body.location,
user:req.body.user
})



if (savesecondmodel.typeOfImporter == "تنفيذ مقاول") {



// const {error} = schemaimport.validate(savesecondmodel)
// if (error) return res.send({error:error.details})
const saver = await savesecondmodel.save()
 const findByID = await previewStoreSchema.findOne({store:saver.store,
    items:saver.items
    })
    console.log("findByID")
switch (saver.transaction) {
    case "منصرف":
        if (!findByID || (findByID.quantity - saver.quantity) < 0)  {
            const deleterr = await secondModel.findByIdAndDelete(saver._id) 
            return res.send("error")}
        if(findByID.type !== saver.unit) return res.send("error")
        const updatedDec = await previewStoreSchema.findByIdAndUpdate(findByID._id,{"$inc":{quantity:- saver.quantity}})
        res.send ("not true")
        break;
        case "وارد":
            if (!findByID) return res.send("error")
            const updatedInc = await previewStoreSchema.findByIdAndUpdate(findByID._id,{"$inc":{quantity:+ saver.quantity}})
            res.send ("not true")
            break;
    
    default:
        break;

}
    

}
else if (savesecondmodel.typeOfImporter == "تنفيذ ذاتي"){
    const saver = await savesecondmodel.save()
    const findByID = await previewStoreSchema.findOne({store:saver.store,
        items:saver.items
        })
    switch (saver.transaction) {
        case "منصرف":
            if (!findByID || (findByID.quantity - saver.quantity) < 0)  {
                const deleterr = await secondModel.findByIdAndDelete(saver._id) 
                return res.send("error")}
            if(findByID.type !== saver.unit) return res.send("error")
            const updatedDec = await previewStoreSchema.findByIdAndUpdate(findByID._id,{"$inc":{quantity:- saver.quantity}})
            res.send ("not true")
            break;
            case "وارد":
                if (!findByID) return res.send("error")
                const updatedInc = await previewStoreSchema.findByIdAndUpdate(findByID._id,{"$inc":{quantity:+ saver.quantity}})
                res.send ("not true")
                break;
        
        default:
            break;
    
    }
    
}


})

  
appSecondTransaction.get("/specificdatas/:store",(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "https://my-amac-react-app.vercel.app");
    res.header({"Access-Control-Allow-Credentials": true});
    res.header("Access-Control-Max-Age", 24*60*60*1000);
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

    const sender = req.cookies.token
  // console.log(sender)
  if(!sender) return res.send("false");
  const decoder =  jwt.verify(sender,process.env.MYSECRET)
  
if(!decoder) return res.send("false");
next()}

,async(req,res)=>{
    
 store=req.params.store;
    const finder = await previewStoreSchema.find({store:store})
    res.send(finder)

})
appSecondTransaction.get("/getsecondtransactions",(req,res,next)=>{
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
    
        
      
        const finder = await secondModel.find();
        res.send(finder)
    
     
      
      } catch (error) {
        res.send("not authenticated")
      }
  
})
appSecondTransaction.get("/deletesecondtransaction/:id",async(req,res)=>{
    
    const id =req.params.id;
    console.log(id)
    await secondModel.findByIdAndDelete(id)
    res.send("deleted")
    
    
    
    
    })
module.exports.appSecondTransaction = appSecondTransaction
