const cookieParser = require("cookie-parser")
const express = require("express")
const jwt =require("jsonwebtoken")
const { loginHandleMongo } = require("./registeruser")

require('dotenv').config({ debug: true })
appLogin=express()
appLogin.use(cookieParser())

// function Loginmiddleware(req,res,next) {

// const getcookies = req.cookies(etagheader)
// if (!getcookies){

// }



// }


appLogin.post("/login",async (req,res)=>{
    res.set({"Access-Control-Allow-Origin": "https://my-amac-react-app.vercel.app"});

const email = req.body.email
const password = req.body.password

if(!email || !password) return res.send({data:"dataNotFound"});

const findUser = await loginHandleMongo.findOne({email:email,password:password})


if (!findUser) return res.send({data:"dataNotFound"});



const jwter = jwt.sign({username:findUser.username,
    firstName:findUser.firstName,
    url:findUser.url,id:findUser._id},process.env.MYSECRET)
            


res.cookie("token",jwter)
res.send(jwter)











})
module.exports.appLogin=appLogin