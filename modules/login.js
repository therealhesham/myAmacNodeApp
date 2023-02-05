const express = require("express")
const jwt =require("jsonwebtoken")
const { loginHandleMongo } = require("./registeruser")
const session = require("express-session")
const Cookies = require("universal-cookie")
const { app } = require("../app")
require('dotenv').config({ debug: true })
appLogin=express()
appLogin.use(session({resave:false,secret:'session',cookie:{maxAge:1000*60*60,sameSite:"none",secure:true}}))


appLogin.post("/login",async (req,res)=>{
req.session.name ="hesham"
const email = req.body.email
const password = req.body.password

if(!email || !password) return res.send({data:"dataNotFound"});

const findUser = await loginHandleMongo.findOne({email:email,password:password})


if (!findUser) return res.send({data:"dataNotFound"});



const jwter = jwt.sign({username:findUser.username,
    firstName:findUser.firstName},process.env.MYSECRET)
            


// res.header("token",jwter)
// res.set("token",jwter)

// res.header({"Set-Cookie":"jwter=lllllll"})
// res.header("Set-Cookie","jwter=lllllll")
// res.header({"etag":"jwterlllllll"})
// res.set("etag","jwterlllllll")
// res.set({"Cookie":"jwter=lllllll"})
// res.setHeader({"eTag":"jwterlllllll"})
// // res.clearCookie('token')
// // res.set("token",jwter)
// res.cookie("token","jwter"
// // ,{
// //       maxAge:  24*60*60 * 1000 ,samSite:"None" ,secure : false , httpOnly:false 
// // }
// );


res.send({data:req.headers})








})
module.exports.appLogin=appLogin