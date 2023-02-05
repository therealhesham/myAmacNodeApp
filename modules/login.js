const express = require("express")
const jwt =require("jsonwebtoken")
const { loginHandleMongo } = require("./registeruser")
const Cookies = require("universal-cookie")
require('dotenv').config({ debug: true })
appLogin=express()



appLogin.post("/login",async (req,res)=>{

const email = req.body.email
const password = req.body.password

if(!email || !password) return res.send({data:"dataNotFound"});

const findUser = await loginHandleMongo.findOne({email:email,password:password})


if (!findUser) return res.send({data:"dataNotFound"});



const jwter = jwt.sign({username:findUser.username,
    firstName:findUser.firstName},process.env.MYSECRET)
            


// res.header("token",jwter)
// res.header({"token":jwter})
res.clearCookie('token')
// res.set("token",jwter)
res.cookie("token","jwter",{
      maxAge:  24*60*60 * 1000 ,sanSite:"None" ,secure : false
});


res.send(jwter)








})
module.exports.appLogin=appLogin