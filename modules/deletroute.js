const express = require("express")

appDelete = express()


const { previewStoreSchema } = require("./storepreview");

appDelete.post("/delete",async(req,res)=>{

const id =req.body.id;

const delet = await previewStoreSchema.findByIdAndDelete(id)

res.send(delet)

})

module.exports.expressApp = express
module.exports.appDelete = appDelete