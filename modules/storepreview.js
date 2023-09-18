const express = require("express")
const cookieParser=require("cookie-parser")
const jwt = require("jsonwebtoken")
require('dotenv').config({ debug: true })
appPreview= express()
appPreview.use(cookieParser())
const { default: mongoose } = require("mongoose");
const { app } = require("../app")
const NAMEVar= process.env.MONGOUSERNAME
const COLLECTIONNAME = process.env.COLLECTIONNAME
mongoose.connect("mongodb+srv://"+ process.env.MONGOUSERNAME +":"+process.env.MONGOPASSWORD +"@cluster0.hkh2k.mongodb.net/"+ COLLECTIONNAME+"?retryWrites=true&w=majority",()=>console.log("mongoose connected"));


const schema = new mongoose.Schema({

    store :{type:"string",required:true},
    items:{type:"string",required:true},
    type:{type:"string",required:true},
  date: {type:"string",default:new Date(Date.now()).toDateString()}
,
quantity:{type:"number",required:true}})
  const mYmodel = mongoose.model("mainwarhouses",schema)



  appPreview.get("/preview",(req,res,next)=>{
res.header("Access-Control-Allow-Origin", "*");
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
next()}

,async(req,res)=>{
    
    try {
    //   var pairs = req.headers.cookie.split(';')
    // console.log(req.cookies)
    //   var cookies = {};
    //   for (var i = 0; i < pairs.length; i++) {
    //      var nameValue = pairs[i].split('=');
    //      cookies[nameValue[0].trim()] = nameValue[1];
    //   }
      
      
    
  
    const finder = await mYmodel.find({});


    res.send(finder)
      
 
  


    } catch (error) {
      
    }
    
  })


const namesOfContractors = new mongoose.Schema({

   
name:"string",


})
  const contractors = mongoose.model("contractors",namesOfContractors)
  const namesOfStores = new mongoose.Schema({

   
    name:"string",
    
    
    })
      const stores = mongoose.model("stores",namesOfStores)
    
    
      const nameOfPlaces = new mongoose.Schema({

   
        name:"string",
        
        
        })
          const places = mongoose.model("places",nameOfPlaces)
        
        
    

      
    


appPreview.post("/namesofcontractors",async(req,res)=>{


try {
    const data= new contractors({name:req.body.name})

const saver = await data.save()
  res.send(saver)
} catch (error) {
    res.send("error")
}
  


})
appPreview.get("/listofnames",async (req,res)=>{
try {

    const finder =await contractors.find({})

    res.send(finder)
} catch (error) {
    console.log("error")
}
    


}

)


appPreview.post("/namesofstores",async(req,res)=>{

    
    try {
        const data= new stores({name:req.body.name})
    
    const saver = await data.save()
      res.send(saver)
    } catch (error) {
        res.send("error")
    }
      
    
    
    })
    appPreview.get("/listofstores",async (req,res)=>{
    try {
        const finder = await stores.find({})
    
    } catch (error) {
        res.send("error")
    }
        
    
    
    }
    
    )






        
        
        appPreview.post("/listofplaces",async(req,res)=>{
        
        
            try {
                const data= new places({name:req.body.name})
            
            const saver = await data.save()
        res.send(saver)      
            } catch (error) {
                res.send("error")
            }
              
            
            
            })
            appPreview.get("/listofplaces",async (req,res)=>{
            try {
                const finder = await places.find({})
            
                res.send(finder)
            } catch (error) {
                res.send("error")
            }
                
            
            
            }
            
            )
        
        
        
        
  module.exports.preview=appPreview
  module.exports.previewStoreSchema=mYmodel
  module.exports.mongoosetransaction= mongoose
