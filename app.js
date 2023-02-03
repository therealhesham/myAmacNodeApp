const express = require('express');
const mongoose = require('mongoose');

const mysql = require("mysql")
const jwt = require("jsonwebtoken")
const cors = require('cors');
const { body, check } = require('express-validator');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const { my } = require('./getdatafromMysql');
// const { appregister } = require('./userregisterroute');
const helmet = require('helmet');
const path = require("path")
const { appLogin } = require('./modules/login');
const { preview, previewStoreSchema, mongoosetransaction } = require('./modules/storepreview');
require('dotenv').config()

const morgan = require('morgan');
const { appDelete } = require('./modules/deletroute');
const { appPostNewDataTostore } = require('./modules/postNewDatas');
const { transactRoute } = require('./modules/transactionroute');
const { appSecondTransaction } = require('./modules/secondTransaction');
const { appThirdTransaction } = require('./modules/thirdTransaction');
const { appSpecific } = require('./modules/specific');
const { appFourthTransction } = require('./modules/fourthtransaction');
const { userList, sockets } = require('./modules/users');
const { appRegisterNew } = require('./modules/registeruser');
const app = express();
app.use(express.json())


const { createProxyMiddleware } = require('http-proxy-middleware')
  
//   app.use('/*', createProxyMiddleware({ 
//     target: '*', //original url
//     changeOrigin: true, 
//     //secure: false,
//     onProxyRes: function (proxyRes, req, res) {
//        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
//        proxyRes.headers['Access-Control-Allow-Methods'] = ['GET','POST','HEAD','PUT','PATCH','DELETE'];
//     }
// }));
app.use(cookieParser())  
 app.use(cors({credentials:false,maxAge:555555555555,origin:"https://my-amac-react-app.vercel.app"}));

function MiddleWareFunctionForLogin(req,res,next){
if(req.method =="GET"){

  try {
    
    var pairs = req.headers.cookie.split(';')
  
    var cookies = {};
    for (var i = 0; i < pairs.length; i++) {
       var nameValue = pairs[i].split('=');
       cookies[nameValue[0].trim()] = nameValue[1];
    }
    
    
    const sender = cookies.token
    const decoder = jwt.verify(sender,process.env.MYSECRET)
    if(decoder) next()
 
  
  } catch (error) {
    res.send("not authenticated")
  }
  
  
  }else if(req.method =="POST")
  {
    console.log("success")
    next()
  }
  }
  
  const allowCrossDomain = function(req, res, next) {
    // ssss
    // sss
    // res.header('Access-Control-Allow-Origin', "https://localhost:3000/");
    // res.header('Access-Control-Allow-Origin', "localhost:3000/");
    
    
    res.header({'Connection':'keep-alive'})
    
    
    res.header({'Access-Control-Allow-Origin': "https://my-amac-react-app.vercel.app/"});
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

    res.header({'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS'});
    res.header({'Content-Type': 'text/plain'});
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
  // app.use(allowCrossDomain);
    
  
// app.use(MiddleWareFunctionForLogin)
app.use(userList)
var http = require('http').createServer(app)



// app.use(morgan("tiny"))
app.use(appDelete)
app.use(appSpecific)
// app.use(appregister)
app.use(transactRoute)
app.use(appPostNewDataTostore)
app.use(appSecondTransaction)

app.use(appFourthTransction)
app.use(helmet())
app.use(appThirdTransaction)

app.use(appLogin)
app.use(appRegisterNew)

app.use(preview)



const schema = new mongoose.Schema({
  store :"string",
  items:"string",
date: {type:"string",default:Date.now()}})
const mYmodel = mongoose.model("mainstore",schema)

app.get('/', async (req, res) => {
  // const find =  await mYmodel.find() ;
  
  console.log(req.headers);
  res.header('name', 'geeksfossrgeeks')
  res.send("data")
    // console.log(req);

})

    
    //some other code


// app.options('/login', cors()) 

  
app.post("/datapost",async(req,res)=>

{
console.log(req.cookies);

const data = new mYmodel({store :req.body.store,
  items:req.body.items,
})

// const findToValidateSonething = await mYmodel.findOne({store:data.store})
// if(findToValidateSonething) return res.send("previously registered")
const saver = await data.save()
res.header('etssssag',"hesham").send(data)

// console.log(saver);
}

)








module.exports.app=app
module.exports.appEx=express


// app.listen(process.env.PORT || 3000,()=> console.log("hi"))
// const PORT = 3000;

http.listen(process.env.PORT || 3000, () => {
  console.log(process.env.PORT || 3000);
});
