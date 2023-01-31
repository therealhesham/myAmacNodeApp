const express = require("express");
const { schemaimport } = require("./exectionvalidator");

const { mongoosetransaction, previewStoreSchema } = require("./storepreview");
// const Fawn = require("fawn")

appSecondTransaction = express();

const secondModel = mongoosetransaction.model("secondtransaction",new mongoosetransaction.Schema(
    {
        
transaction:"string",
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



const {error} = schemaimport.validate(savesecondmodel)
if (error) return res.send({error:error.details})
const saver = await savesecondmodel.save()
 const findByID = await previewStoreSchema.findOne({store:data.store,
    items:data.items
    })
    console.log("findByID")
switch (saver.transaction) {
    case "منصرف":
        if (!findByID || (findByID.quantity - saver.quantity) < 0)  {
            const deleterr = await secondModel.findByIdAndDelete(saver._id) 
            return res.send(false)}
        const updatedDec = await previewStoreSchema.findByIdAndUpdate(findByID._id,{"$inc":{quantity:- saver.quantity}})
        res.send (true)
        break;
        case "وارد":
            if (!findByID) return res.send(false)
            const updatedInc = await previewStoreSchema.findByIdAndUpdate(findByID._id,{"$inc":{quantity:+ saver.quantity}})
            res.send (true)
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
                return res.send(false)}
            const updatedDec = await previewStoreSchema.findByIdAndUpdate(findByID._id,{"$inc":{quantity:- saver.quantity}})
            res.send (true)
            break;
            case "وارد":
                if (!findByID) return res.send(false)
                const updatedInc = await previewStoreSchema.findByIdAndUpdate(findByID._id,{"$inc":{quantity:+ saver.quantity}})
                res.send (true)
                break;
        
        default:
            break;
    
    }
    
}


})

  
appSecondTransaction.get("/specificdatas/:store",async(req,res)=>{
    console.log(req.params.store)
 store=req.params.store;
    const finder = await previewStoreSchema.find({store:store})
    res.send(finder)

})
appSecondTransaction.get("/getsecondtransactions",async(req,res)=>{

    const finder = await secondModel.find();
    res.send(finder)

})
appSecondTransaction.get("/deletesecondtransaction",async(req,res)=>{
    const id =req.body.id;

    const delet = await secondModel.findByIdAndDelete(id)
    
    res.send(delet)
    
    
    })
module.exports.appSecondTransaction = appSecondTransaction