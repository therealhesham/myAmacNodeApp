const express = require("express")
const jwt =require("jsonwebtoken")
const { loginHandleMongo } = require("./registeruser")
const session = require("express-session")
const Cookies = require("universal-cookie")
const { app } = require("../app")
require('dotenv').config({ debug: true })
appLogin=express()
appLogin.use(express.json())
// appLogin.use(session({resave:false,secret:'session',cookie:{maxAge:1000*60*60,sameSite:"none",secure:true}}))


appLogin.post("/login",async (req,res)=>{
// req.session.name ="hesham"
res.set({"Access-Control-Allow-Origin": "https://my-amac-react-app.vercel.app"});
res.set({"Access-Control-Allow-Credential": true});
res.header({"Access-Control-Allow-Origin": "https://my-amac-react-app.vercel.app"});
res.header({"Access-Control-Allow-Credential": true});

const email = req.body.email
const password = req.body.password

if(!email || !password) return res.send({data:"dataNotFound"});

const findUser = await loginHandleMongo.findOne({email:email,password:password})


if (!findUser) return res.send({data:"dataNotFound"});



const jwter = jwt.sign({username:findUser.username,
    firstName:findUser.firstName},process.env.MYSECRET)
            


res.header("token",jwter)
// res.set("token",jwter)

// res.header({"Set-Cookie":"jwter=lllllll"})
// res.header("Set-Cookie","jwter=lllllll")
// res.header({"If-None-Match":"jwterlllllll"})
// res.set("If-None-Match","jwterlllllll")

 res.setHeader({"eTag":"jwterlllllll"})
// // res.clearCookie('token')
// // res.set("token",jwter)
res.cookie("token","jwter"
,{
      maxAge:  24*60*60 * 1000 , httpOnly:false 
}
);


res.send({data:jwter})








})
module.exports.appLogin=appLogin