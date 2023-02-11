const express = require("express");
const { schemaimport } = require("./exectionvalidator");

const { mongoosetransaction, previewStoreSchema } = require("./storepreview");
// const Fawn = require("fawn")

appThirdTransaction = express();

const thirdModel = mongoosetransaction.model("thirdtransaction",new mongoosetransaction.Schema(
    {
        
from:"string",
to:{type:"string",required:true},

transaction:{type:"string"},

quantity:{type:"number",required:true},
items:{type:"string",required:true},
unit:{type:"string"},

date:{type:"string",default:new Date(Date.now()).toDateString()},
user:"string"
})

)
appThirdTransaction.post("/thirdtransaction",async(req,res)=>{

const savesecondmodel = new thirdModel({
    transaction:"تحويل",
from:req.body.from,
to:req.body.to,


quantity:req.body.quantity,
items:req.body.items,
unit:req.body.unit,

user:req.body.user
})



const saver = await savesecondmodel.save()
 const findByID = await previewStoreSchema.findOne({store:savesecondmodel.from,
    items:savesecondmodel.items
    })
    
const findByIDinc = await previewStoreSchema.findOne({store:savesecondmodel.to,
        items:savesecondmodel.items
        })
switch (saver.transaction) {
    case "تحويل":
        if (!findByID  || !findByIDinc || (findByID.quantity - saver.quantity) < 0 ) 
         {await thirdModel.findByIdAndDelete(saver._id) 
        
            return  res.send(false)}
        if(findByID.quantity < 0)    {await thirdModel.findByIdAndDelete(saver._id) 
        
        return  res.send(false)
        }
        const updatedDec = await previewStoreSchema.findByIdAndUpdate(findByID._id,{"$inc":{quantity:- saver.quantity}})
        const updatedInc = await previewStoreSchema.findByIdAndUpdate(findByIDinc._id,{"$inc":{quantity:+ saver.quantity}})
        res.send(true)
        
        break;
        case "وارد":
            if (!findByID) return res.send(false)
            // const updatedInc = await previewStoreSchema.findByIdAndUpdate(findByID._id,{"$inc":{quantity:+ saver.quantity}})
            res.send (true)
            break;
    
    default:
        break;

}
    

    
})
appSecondTransaction.get("/getthirdtransactions",async(req,res)=>{
    try {
    
        var pairs = req.headers.cookie.split(';')
      
        var cookies = {};
        for (var i = 0; i < pairs.length; i++) {
           var nameValue = pairs[i].split('=');
           cookies[nameValue[0].trim()] = nameValue[1];
        }
        
        
        const sender = cookies.token
        const decoder = jwt.verify(sender,process.env.MYSECRET)
        const finder = await thirdModel.find();
        res.send(finder)
  
     
      
      } catch (error) {
        res.send("not authenticated")
      }
      
    
    })
    appSecondTransaction.get("/deletethirdtransaction/:id",async(req,res)=>{
    
        const id =req.params.id;
        console.log(id)
        await thirdModel.findByIdAndDelete(id)
        res.send("deleted")
        
        
        
        
        })
    
module.exports.appThirdTransaction = appThirdTransaction