const express = require("express")
const jwt = require("jsonwebtoken")
require('dotenv').config({ debug: true })
appPreview= express()

const { default: mongoose } = require("mongoose");
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



  appPreview.get("/preview",async(req,res)=>{
    
    try {
    //   var pairs = req.headers.cookie.split(';')
    // console.log(req.cookies)
    //   var cookies = {};
    //   for (var i = 0; i < pairs.length; i++) {
    //      var nameValue = pairs[i].split('=');
    //      cookies[nameValue[0].trim()] = nameValue[1];
    //   }
      
      
    const sender = req.cookies.token
    // console.log(sender)
    if(!sender) return res.send(req.path)
    const decoder =  jwt.verify(sender,process.env.MYSECRET)
    // console.log(decoder)
  // if(!decoder) return res.send("not authenticated")
  
  
    const finder = await mYmodel.find({});


    res.send(finder)
      
 
  


    } catch (error) {
      
    }
    
  })



  module.exports.preview=appPreview
  module.exports.previewStoreSchema=mYmodel
  module.exports.mongoosetransaction= mongoose