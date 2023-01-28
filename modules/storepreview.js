const express = require("express")
require('dotenv').config({ debug: true })
appPreview= express()

const { default: mongoose } = require("mongoose");
const NAMEVar= process.env.MONGOUSERNAME
const COLLECTIONNAME = process.env.COLLECTIONNAME
mongoose.connect("mongodb+srv://"+ process.env.MONGOUSERNAME +":"+process.env.MONGOPASSWORD +"@cluster0.hkh2k.mongodb.net/"+ COLLECTIONNAME+"?retryWrites=true&w=majority",()=>console.log("mongoose connected"));


const schema = new mongoose.Schema({
    store :{type:"string",required:true},
    items:{type:"string",required:true},
  date: {type:"string",default:new Date(Date.now()).toDateString()}
,
quantity:{type:"number",required:true}})
  const mYmodel = mongoose.model("mainwarhouses",schema)



  appPreview.get("/preview",async(req,res)=>{
    
// console.log(req.headers)
// console.log(req.header("etag"))
// console.log(req.cookies.ss)
const finder = await mYmodel.find({});


res.send(finder)
  



  })



  module.exports.preview=appPreview
  module.exports.previewStoreSchema=mYmodel
  module.exports.mongoosetransaction= mongoose