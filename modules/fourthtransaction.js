const express = require("express");
const jwt =require("jsonwebtoken")
const { default: mongoose } = require("mongoose");
const { app } = require("../app");
const { mongoosetransaction, previewStoreSchema } = require("./storepreview");

appFourthTransction = express();
const refunder = mongoosetransaction.model("refund",new mongoosetransaction.Schema({
    transactionType:"string",
    receiptno:"string",
    contractor:{type:"string",required:true},
    destination:{type:"string",required:true},
    items:{type:"string",required:true},
    quantity:{type:"string",required:true},
    type:{type:"string",required:true},
    user:"string",
    date:"string",
    
        }))
    
    
        appFourthTransction.post("/refund",(req,res,next)=>{
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
      if(!decoder.isAdmin) return res.send("not authenticated");
      next()}
      
      ,async (req,res)=>{
          
    
    try {
    
        
        const sender = req.cookies.token
        const decoder = jwt.verify(sender,process.env.MYSECRET)
        const saver = new refunder({
            transactionType:"مرتجع",
            contractor:req.body.contractor,
            destination:req.body.destination,
            items:req.body.items,
            receiptno:req.body.receiptno,
            quantity:req.body.quantity,
            type:req.body.type,
            date:req.body.date,
            user:decoder.username
            
            
                })
    
    
    
    const findByI = await previewStoreSchema.findOne({store:saver.destination,
                    items:saver.items
                    })
                    // ||  findByI.items < 1 || (findByI.quantity - saver.quantity) < 0
    if(  !findByI  ) return res.send("error")                ;
    const saveNewData = await  saver.save();
    
    // const findByID = await previewStoreSchema.findOne({store:saveNewData.destination,
    //     items:saveNewData.items
    //     })
        
    switch (saver.transactionType) {
        case "مرتجع":
            
        if (!findByI.unit !== saveNewData.type  ) 
        {await refunder.findByIdAndDelete(saveNewData._id) 
       
           return  res.send("error")}
            const updatedInc = await previewStoreSchema.findByIdAndUpdate(findByI._id,{"$inc":{quantity:+ saveNewData.quantity}})
            res.send ("not false")
    
            
            break;
    
        default:
            break;
    }
    
    
    
    
     
      
      } catch (error) {
        res.send("error")
      }
      
    
})




appFourthTransction.get("/refunds",async(req,res)=>{
    try {
    
        const sender = req.cookies.token
        
        const decoder = jwt.verify(sender,process.env.MYSECRET)
    
        

      
        const finder = await refunder.find()
        res.send(finder)
    
       
      
      } catch (error) {
        res.send("not authenticated")
      }
  

})


appFourthTransction.get("/deletrefund/:id",async(req,res)=>{
  const sender = req.cookies.token
  // console.log(sender)
  if(!sender) return res.send("not authenticated");
  const decoder =  jwt.verify(sender,process.env.MYSECRET)
  
if(!decoder) return res.send("not authenticated");
if(!decoder.isAdmin) return res.send("not authenticated");

    const id =req.params.id;
    
  await refunder.findByIdAndDelete(id)
    
    res.send("delet")
    



})




module.exports.appFourthTransction=appFourthTransction