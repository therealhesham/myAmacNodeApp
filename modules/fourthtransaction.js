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
    try {
    
        var pairs = req.headers.cookie.split(';')
      
        var cookies = {};
        for (var i = 0; i < pairs.length; i++) {
           var nameValue = pairs[i].split('=');
           cookies[nameValue[0].trim()] = nameValue[1];
        }
        
        
        const sender = cookies.token
        const decoder = jwt.verify(sender,process.env.MYSECRET)
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
    
    
    
    
     
      
      } catch (error) {
        res.send("not authenticated")
      }
      
    
})




appFourthTransction.get("/refunds",async(req,res)=>{
    try {
    
        var pairs = req.headers.cookie.split(';')
      
        var cookies = {};
        for (var i = 0; i < pairs.length; i++) {
           var nameValue = pairs[i].split('=');
           cookies[nameValue[0].trim()] = nameValue[1];
        }
        
        
        const sender = cookies.token
        const decoder = jwt.verify(sender,process.env.MYSECRET)

      
        const finder = await refunder.find()
        res.send(finder)
    
       
      
      } catch (error) {
        res.send("not authenticated")
      }
  

})


appFourthTransction.get("/deletrefund/:id",async(req,res)=>{

    const id =req.params.id;
    
  await refunder.findByIdAndDelete(id)
    
    res.send("delet")
    



})




module.exports.appFourthTransction=appFourthTransction