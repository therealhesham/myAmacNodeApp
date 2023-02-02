const express = require("express")

const jwt =require("jsonwebtoken")
const { allowCrossDomain } = require("../app")
const { loginHandleMongo } = require("./registeruser")
require('dotenv').config({ debug: true })
appLogin=express()
const allowCrossDomain = function(req, res, next) {
    
    
    // res.header('Access-Control-Allow-Origin', "https://localhost:3000/");
    // res.header('Access-Control-Allow-Origin', "localhost:3000/");
    
    
    res.header('Connection', 'keep-alive')
    // res.set('Access-Control-Allow-Origin', "https://my-amac-react-app.vercel.app/");
    res.set({"Access-Control-Allow-Origin": "https://my-amac-react-app.vercel.app/"});
    res.append({'Access-Control-Allow-Origin': "https://my-amac-react-app.vercel.app"});
    // res.append('Access-Control-Allow-Origin', "https://my-amac-react-app.vercel.app/");
    // res.header('Access-Control-Allow-Origin', "https://localhost:3001/");
    // res.header('Access-Control-Allow-Origin', "https://localhost:3001/");
    // res.header('Access-Control-Allow-Origin', "http://localhost:3000/");
    // res.header('Access-Control-Allow-Origin', "http://localhost:3000/");
    // res.header('Access-Control-Allow-Origin', "http://localhost:3001/");
    // res.header('Access-Control-Allow-Origin', "localhost:3000");
    // res.header('Access-Control-Allow-Origin', "https://localhost:3000");
    // res.header('Access-Control-Allow-Origin', "https://localhost:3001");
    // res.header('Access-Control-Allow-Origin', "https://localhost:3001");
        // res.header('Access-Control-Allow-Origin',"*");
    // res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    // res.header('Access-Control-Allow-Origin', "http://localhost:3001");
    // res.header('Access-Control-Allow-Credentials', false);

    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Content-Type', 'text/plain');
    // : text/html; charset=utf-8
    // 
    // res.header('Access-Control-Allow-Headers', 'Content-Type');
    
    // res.set('Access-Control-Allow-Origin', "localhost:3000/");
    // res.set('Access-Control-Allow-Origin', "https://localhost:3000");
    // res.set('Access-Control-Allow-Origin', "https://localhost:3001");
    // res.set('Access-Control-Allow-Origin', "https://localhost:3001");
    // res.set('Access-Control-Allow-Origin', "http://localhost:3000");
    // res.set('Access-Control-Allow-Origin', "http://localhost:3001");
    // res.set('Access-Control-Allow-Origin',"*");
    // res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    
    
    // res.set('Access-Control-Allow-Headers', 'Content-Type');
    next();
  }
  

// function Loginmiddleware(req,res,next) {

// const getcookies = req.cookies(etagheader)
// if (!getcookies){

// }



// }


appLogin.post("/login",allowCrossDomain,async (req,res)=>{

    console.log("forLoginRote")
const email = req.body.email
const password = req.body.password


const findUser = await loginHandleMongo.findOne({email:email,password:password})


if (!findUser) return res.send({data:"dataNotFound"});



const jwter = jwt.sign({username:findUser.username,
    firstName:findUser.firstName,
    url:findUser.url,id:findUser._id},process.env.MYSECRET)
            


res.cookie("token",jwter)
res.send(jwter)     











})
module.exports.appLogin=appLogin