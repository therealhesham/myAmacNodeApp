
const { expressApp } = require("./deletroute");
const { previewStoreSchema } = require("./storepreview");



const appPostNewDataTostore = expressApp()



appPostNewDataTostore.post("/postnewdatatostore",async(req,res)=>

{

const data= new previewStoreSchema({data:req.body.date,
    store:req.body.store,
    items:req.body.items,
    type:req.body.type,
    quantity:req.body.quantity})

try {
    const dataSaved = await data.save()
    res.send(dataSaved)
} catch (error) {
    res.send(error)
}
}




)



module.exports.appPostNewDataTostore=appPostNewDataTostore