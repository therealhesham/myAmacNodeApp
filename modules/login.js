const express = require("express")
const jwt =require("jsonwebtoken")
const { loginHandleMongo } = require("./registeruser")
const Cookies = require("universal-cookie")
const cors= require("cors")
require('dotenv').config({ debug: true })
appLogin=express()
appLogin.use(cors({credentials:true,maxAge:1000000000,origin:"https://amacdatabase.onrender.com/"}));


// function Loginmiddleware(req,res,next) {

// const getcookies = req.cookies(etagheader)
// if (!getcookies){

// }



// }


appLogin.post("/login",async (req,res)=>{
    
const email = req.body.email
const password = req.body.password

if(!email || !password) return res.send({data:"dataNotFound"});

const findUser = await loginHandleMongo.findOne({email:email,password:password})


if (!findUser) return res.send({data:"dataNotFound"});



const jwter = jwt.sign({username:findUser.username,
    firstName:findUser.firstName,
    url:findUser.url,id:findUser._id},process.env.MYSECRET)
            


// res.header("token",jwter)
res.header({"token":jwter})
// res.set("token",jwter)
res.cookie("token","jwter",{
      maxAge: 1000000
    });
// console.log(req.headers)

res.send(jwter)








})
module.exports.appLogin=appLogin