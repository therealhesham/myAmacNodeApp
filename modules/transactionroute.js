const express = require("express")

const { mongoosetransaction, previewStoreSchema } = require("./storepreview");
// const Fawn = require("fawn")

appTransactionRoute = express();
// Fawn.init(mongoosetransaction)
const modelexport = mongoosetransaction.model("firstTransaction",new mongoosetransaction.Schema(
    {
        
transactionType:"string",
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
appTransactionRoute.get("/firsttansactionlist",async(req,res)=>{
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
        
     
      
      } catch (error) {
        res.send("not authenticated")
      }
      



})
appTransactionRoute.post("/transactionexport",async(req,res)=>{

/*
transaction of stores usualy from(preview Schema) to (destination will 
be left free til any further suggestions    ) 

so it schema will be like that {from,to,items,quantity,date,userhandled transaction}
*/
try {
    console.log(req.body)
    const data =  new modelexport({
        transactionType:"وارد",
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
        items:data.items
    })
    
    // previewStoreSchema.findOneAndUpdate
    switch (saver.transactionType) {
        case "منصرف":
            if (!findByID) return res.send(false)
            const updatedDec = await previewStoreSchema.findByIdAndUpdate(findByID._id,{"$inc":{quantity:- saver.quantity}})
            res.send (true)
            break;
        case "وارد":
            if (!findByID) return res.send(false)
            const updatedInc = await previewStoreSchema.updateOne({_id:findByID._id},{"$inc":{quantity:+ saver.quantity}})
            res.send (true)
            break;
        
        default:
            break;

    }
        
} catch (error) {
 res.send(false);
}


// if (updated.acknowledged) res.send (`Document associated with ${findByID._id} has been updated Successfully`)




})

module.exports.transactRoute = appTransactionRoute