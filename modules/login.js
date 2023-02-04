const express = require("express")
const jwt =require("jsonwebtoken")
const { loginHandleMongo } = require("./registeruser")
const Cookies = require("universal-cookie")
require('dotenv').config({ debug: true })
appLogin=express()



appLogin.post("/login",async (req,res)=>{
    res.header({"Access-Control-Allow-Origin": "https://my-amac-react-app.vercel.app"});
    res.set({"Access-Control-Allow-Origin": "https://my-amac-react-app.vercel.app"});
    res.setHeader({"Access-Control-Allow-Origin": "https://my-amac-react-app.vercel.app"});
    res.header({"Access-Control-Allow-Methods": "POST"});
    res.header({"Access-Control-Allow-Credentials": "true"});
    
    res.set({"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"})
    res.header({"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"})
    
    // Access-Control-Allow-Headers
const email = req.body.email
const password = req.body.password

if(!email || !password) return res.send({data:"dataNotFound"});

const findUser = await loginHandleMongo.findOne({email:email,password:password})


if (!findUser) return res.send({data:"dataNotFound"});



const jwter = jwt.sign({username:findUser.username,
    firstName:findUser.firstName,
    url:findUser.url,id:findUser._id},process.env.MYSECRET)
            


// res.header("token",jwter)
// res.header({"token":jwter})
// res.set("token",jwter)
res.cookie("token","jwter",{
      maxAge: 1000000
    });
// console.log(req.headers)

res.send(jwter)








})
module.exports.appLogin=appLogin