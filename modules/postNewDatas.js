
const { expressApp } = require("./deletroute");
const { previewStoreSchema } = require("./storepreview");
const jwt =require("jsonwebtoken")


const appPostNewDataTostore = expressApp()

appPostNewDataTostore.post("/updatedata",(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "https://my-amac-react-app.vercel.app");
    res.header({"Access-Control-Allow-Credentials": true});
    
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

    
next()}

,async(req,res)=>

{


    try {
        // console.log(req.body.id)
        const updater = await previewStoreSchema.findByIdAndUpdate(req.body.id,{store:req.body.store,
            items:req.body.items,
            type:req.body.type,
            quantity:req.body.quantity})

    res.send("updated")
} catch (error) {
    res.send("false")
}
}




)



appPostNewDataTostore.post("/postnewdatatostore",(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "https://my-amac-react-app.vercel.app");
    res.header({"Access-Control-Allow-Credentials": true});
    
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

    
next()}

,async(req,res)=>

{
    try {
const data= new previewStoreSchema({data:req.body.date,
    store:req.body.store,
    items:req.body.items,
    type:req.body.type,
    quantity:req.body.quantity})


    const dataSaved = await data.save()
    res.send("success")
} catch (error) {
    res.send(error)
}
}




)



module.exports.appPostNewDataTostore=appPostNewDataTostore