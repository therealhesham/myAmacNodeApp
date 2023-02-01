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
require('dotenv').config({ debug: true })

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
function MiddleWareFunctionForLogin(req,res,next){


  try {
    if( req.method == "GET"){
    var pairs = req.headers.cookie.split(';')
  
    var cookies = {};
    for (var i = 0; i < pairs.length; i++) {
       var nameValue = pairs[i].split('=');
       cookies[nameValue[0].trim()] = nameValue[1];
    }
    
    
    const sender = cookies.token
    const decoder = jwt.verify(sender,process.env.MYSECRET)
    if(decoder) next()}

    else if(req.method == "POST"){

      next()

    }
  
  } catch (error) {
    res.send("not authenticated")
  }
  
  
  
  }
  
  
app.use(MiddleWareFunctionForLogin)
app.use(userList)
var http = require('http').createServer(app)
var io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
    allowedHeaders: ["Access-Control-Allow-Origin"],
    credentials: true
  }
});


io.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client */
    
    socket.emit("connection",socket)
    socket.on("channel-join",id=>{
    console.log(id)



// socket.on("disconnect",e =>console.log("hesham Left"))     
    })
    socket.emit('connects', "req.body.message");
       
});

app.use(cookieParser())
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
app.use(cors({credentials:false,maxAge:5555555555}))
app.use(appLogin)
app.use(appRegisterNew)

app.use(preview)



const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "localhost:3001");
    res.header('Access-Control-Allow-Origin', "localhost:3000");
    res.header('Access-Control-Allow-Origin', "https://localhost:3000");
    res.header('Access-Control-Allow-Origin', "https://localhost:3001");
    res.header('Access-Control-Allow-Origin', "https://localhost:3001");
    res.header('Access-Control-Allow-Origin', "https://my-amac-react-app.vercel.app");
    res.header('Access-Control-Allow-Origin', "https://amaccompany.onrender.com/");
    res.header('Access-Control-Allow-Origin', "https://amaccompany.onrender.com");
    
    res.header('Access-Control-Allow-Origin', "https://my-amac-react-app.vercel.app/#");
    res.header('Access-Control-Allow-Origin', "https://my-amac-react-app.vercel.app/register#/");
    res.header('Access-Control-Allow-Origin', "https://my-amac-react-app.vercel.app/login#/");
    res.header('Access-Control-Allow-Origin', "https://my-amac-react-app.vercel.app/register#");
    res.header('Access-Control-Allow-Origin', "https://my-amac-react-app.vercel.app/login#");
    res.header('Access-Control-Allow-Origin', "https://my-amac-react-app.vercel.app/");
    res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    res.header('Access-Control-Allow-Origin', "http://localhost:3001");
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    
    // res.header("Access-Control-Allow-Credentials","true");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);
const schema = new mongoose.Schema({
  store :"string",
  items:"string",
date: {type:"string",default:Date.now()}})
const mYmodel = mongoose.model("mainstore",schema)

app.get('/', async (req, res) => {
  // const find =  await mYmodel.find() ;
  res.cookie("ss","sss")
  console.log(req.headers);
  res.header('name', 'geeksfossrgeeks')
  res.send("data")
    // console.log(req);

})

    
    //some other code

app.post("/registermysql",(req,res)=>
{
const first_name = req.body.fName ;
const second_name = req.body.sName ;
const birth_date = req.body.bDate;
const position = req.body.position



  mysqlConnection.query(`insert into engineeres
  ( first_name,second_name,birth_date,position) 
  values ("hessxham","badr","1992-8-8","heshak")`)



  res.send("ss")
}




)



  
// app.get('/mysql',(req,res)=>{

//   mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Kindaboy27',
//     database: 'sakila',
//     multipleStatements: true
//     }).query(`select * from inventory` ,function (err, result, fields) {
//   if (err) throw err;
//   res.send(result)})

// })



// app.options('/datapost', cors()) 

  
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







module.exports.io=io
module.exports.app=app
module.exports.appEx=express


// app.listen(3000,()=> console.log("hi"))
const PORT = 3000;

http.listen(process.env.PORT || 8885, () => {
  console.log(process.env.PORT || 3000);
});
