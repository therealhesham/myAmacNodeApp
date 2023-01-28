

const express = require("express");
const { previewStoreSchema } = require("./storepreview");
const appSpecific = express();


appSpecific.post("/specificdata", async(req,res)=>{

try {
  const store = req.body.store;
  console.log(req.body);
  const finder =  await previewStoreSchema.find({store:store})
  res.send(finder)
} catch (error) {
  console.log(error);
}
  
})

appSpecific.post("/specificunit", async(req,res)=>{

    try {
      const unit = req.body.unit;
      console.log(req.body);
      const finder =  await previewStoreSchema.find({store:store})
      res.send(finder)
    } catch (error) {
      console.log(error);
    }
      
    })


module.exports.appSpecific=appSpecific;