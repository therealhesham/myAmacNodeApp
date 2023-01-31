const express = require("express");
const { default: mongoose } = require("mongoose");
const { app } = require("../app");
const { mongoosetransaction, previewStoreSchema } = require("./storepreview");

appFourthTransction = express();
const refunder = mongoosetransaction.model("refund",new mongoosetransaction.Schema({
    transactionType:"string",
    contractor:{type:"string",required:true},
    destination:{type:"string",required:true},
    items:{type:"string",required:true},
    quantity:{type:"string",required:true},
    type:{type:"string",required:true},
    user:"string"
    
        }))
    
    
        appFourthTransction.post("/refund",async (req,res)=>{
    // const [contractor,setContractor] = useState("")
    // const [destination,setDestination] = useState("")
    // const [items,setItems] = useState("")
    // const [quantity,setQuantity]=useState("")
    // const [type,setType]=useState("")

    const saver = new refunder({
        transactionType:"مرتجع",
        contractor:req.body.contractor,
        destination:req.body.destination,
        items:req.body.items,
        quantity:req.body.quantity,
        type:req.body.type
        
        
            })



const findByI = await previewStoreSchema.findOne({store:saver.destination,
                items:saver.items
                })
                // ||  findByI.items < 1 || (findByI.quantity - saver.quantity) < 0
if(  !findByI  ) return res.send(false)                ;
const saveNewData = await  saver.save();

// const findByID = await previewStoreSchema.findOne({store:saveNewData.destination,
//     items:saveNewData.items
//     })
    
switch (saver.transactionType) {
    case "مرتجع":
        
        // if (!findByID) return res.send(false)
        const updatedInc = await previewStoreSchema.findByIdAndUpdate(findByI._id,{"$inc":{quantity:+ saveNewData.quantity}})
        res.send (true)

        
        break;

    default:
        break;
}





})




appFourthTransction.get("/refunds",async(req,res)=>{

    const finder = await refunder.find()
    res.send(finder)



})


appFourthTransction.post("/deletrefund",async(req,res)=>{

    const id =req.body.id;
    
    const delet = await refunder.findByIdAndDelete(id)
    
    res.send(delet)
    



})




module.exports.appFourthTransction=appFourthTransction