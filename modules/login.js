const express = require("express")
const jwt =require("jsonwebtoken")
const { loginHandleMongo } = require("./registeruser")
const cors= require("cors")
const session = require("express-session")
const Cookies = require("universal-cookie")
const { app } = require("../app")
require('dotenv').config({ debug: true })
appLogin=express()
appLogin.use(cors({maxAge:24*60*60*1000,origin:"https://my-amac-react-app.vercel.app" ,exposedHeaders:'*',credentials:true,preflightContinue: true}));
appLogin.use(express.json())
// appLogin.use(session({resave:false,secret:'session',cookie:{maxAge:1000*60*60,sameSite:"none",secure:true}}))


appLogin.post("/login",(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "https://my-amac-react-app.vercel.app");
    res.header({"Access-Control-Allow-Credentials": true});
    res.header("Access-Control-Max-Age", 24*60*60*1000);
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    res.header("Set-Cookie", "sid=14A52; max-age=3600;samesite=None;sameSite=none ;SameSite=None ;Secure ")
    res.cookie("token","jwter"
,{
      maxAge: 1000000000 , sameSite : "None",SameSite:"None" ,
      samesite : "None",SameSite:"none" ,
      sameSite : "None",SameSite:"None" 
}
);


next()    


}, async (req,res)=>{
// req.session.name ="hesham"
// res.set({"Access-Control-Allow-Origin": "https://my-amac-react-app.vercel.app"});
// res.set({"Access-Control-Allow-Credential": true});
res.header({"Access-Control-Allow-Origin": "https://my-amac-react-app.vercel.app"});


const email = req.body.email
const password = req.body.password
console.log(req.body)
if(!email || !password) return res.json("dataNotFound");

const findUser =  await loginHandleMongo.findOne({email:req.body.email,password:req.body.password})


if (!findUser) return res.json("dataNotFound");

const jwter = jwt.sign({username:findUser.username,
    id:findUser._id,
    firstName:findUser.firstName,url:findUser.url,
    isAdmin:findUser.isAdmin},process.env.MYSECRET)
  

    res.header("Set-Cookie", "token="+jwter+"; max-age=7*24*60*60*1000;samesite=None;sameSite=none ;SameSite=None ;Secure ")
    res.cookie("hesham","hosom",{sameSite:"none" ,secure:true})
    res.cookie("hessham","hosom",{sameSite:"none" ,secure:false})

res.json(jwter)








})
appLogin.get("/logout",(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "https://my-amac-react-app.vercel.app");
    res.header({"Access-Control-Allow-Credentials": true});
    
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  

next()    


},async(req,res)=>{
    res.header({"Access-Control-Allow-Origin": "https://my-amac-react-app.vercel.app"});

    res.clearCookie("token")
res.send("token deleted")

})


appLogin.get("/checker",(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "https://my-amac-react-app.vercel.app");
    res.header({"Access-Control-Allow-Credentials": true});
    
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  

next()    


},async(req,res)=>{

    const sender = req.cookies.token;
  // console.log(sender)
  if(!sender) return res.send("deleted token");


})


module.exports.appLogin=appLogin