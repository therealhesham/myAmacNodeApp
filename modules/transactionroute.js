const express = require("express")
const jwt = require("jsonwebtoken")
const { mongoosetransaction, previewStoreSchema } = require("./storepreview");
// const Fawn = require("fawn")

appTransactionRoute = express();
// Fawn.init(mongoosetransaction)
const modelexport = mongoosetransaction.model("firstTransaction",new mongoosetransaction.Schema(
    {
        
transactionType:"string",
receiptno:"string",
source:{type:"string",required:true},
destination:{type:"string",required:true},
quantity:{type:"number",required:true},
items:{type:"string",required:true},
unit:{type:"string"},
date:{type:"string",default:new Date(Date.now()).toDateString()},
user:"string"
    })

)

appTransactionRoute.post("/deletfirsttransaction",async(req,res)=>{

    const id =req.body.id;

const delet = await modelexport.findByIdAndDelete(id)

res.send(delet)

    
    
    
    })
appTransactionRoute.get("/firsttansactionlist",(req,res,next)=>{
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
    
        // var pairs = req.headers.cookie.split(';')
      
        // var cookies = {};
        // for (var i = 0; i < pairs.length; i++) {
        //    var nameValue = pairs[i].split('=');
        //    cookies[nameValue[0].trim()] = nameValue[1];
        // }
        
        
        // const sender = cookies.token

        const sender = req.cookies.token
        
        const decoder = jwt.verify(sender,process.env.MYSECRET)

        const finder = await modelexport.find()
        res.send(finder)
        
     
      
      } catch (Error) {
    res.send("not authenticated")
      }
      



})
appTransactionRoute.post("/transactionexport",(req,res,next)=>{
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

/*
transaction of stores usualy from(preview Schema) to (destination will 
be left free til any further suggestions    ) 

so it schema will be like that {from,to,items,quantity,date,userhandled transaction}
*/
try {
    console.log(req.body)
    const data =  new modelexport({
        transactionType:"وارد",
        receiptno:req.body.receiptno,
        source:req.body.source,
        destination:req.body.destination,
    quantity:req.body.quantity,
    items:req.body.items,
    unit:req.body.unit,
    user:req.body.user
    
    })
    // console.log(req.headers.token)
    const saver = await data.save()
    
    const findByID = await previewStoreSchema.findOne({store:data.destination,
        items:data.items,type:data.unit
    })
    
    // previewStoreSchema.findOneAndUpdate
    switch (saver.transactionType) {
        case "منصرف":
            if (!findByID) {
            const deleterr = await modelexport.findByIdAndDelete(saver._id) 
            return res.send("error")}
            
            const updatedDec = await previewStoreSchema.findByIdAndUpdate(findByID._id,{"$inc":{quantity:- saver.quantity}})
            res.send ("not error")
            break;
        case "وارد":
            if (!findByID){
                const deleterr = await modelexport.findByIdAndDelete(saver._id) 
                return res.send("error")}
            const updatedInc = await previewStoreSchema.updateOne({_id:findByID._id},{"$inc":{quantity:+ saver.quantity}})
            res.send ("not error")
            break;
        
        default:
            break;

    }
        
} catch (error) {
 res.send("error");
}


// if (updated.acknowledged) res.send (`Document associated with ${findByID._id} has been updated Successfully`)




})

module.exports.transactRoute = appTransactionRoute