const express =require("express");
// Require the cloudinary library
const { default: mongoose, model } = require("mongoose");
require('dotenv').config({ debug: true })
const  appEx   = require("../app");
const { Joier } = require("./joiregistervalidator");
const jwt = require('jsonwebtoken');
const formidable = require("formidable");
const { sockets } = require("./users");
const { mongoosetransaction } = require("./storepreview");
// require("dotenv").config()
const cors=require("cors")
const cloudinary = require('cloudinary').v2;
appRegisterNew = express();
// Return "https" URLs by setting secure: true

cloudinary.config({ 
  cloud_name: 'dkinaxrul', 
  api_key: '265116928379554', 
  api_secret: 'PnsSPiToKUCzBNFxW8iirXDnEDY',
  secure: true
});
// CLOUDINARY_URL=
// CLOUDINARY_URL="cloudinary://" + process.env.CLOUDINARYKEY+":"+process.env.CLOUDINARYSECRET +"@"+process.env.CLOUDINARYNAME
/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async (imagePath) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      console.log(result);
      return result.public_id;
    } catch (error) {
      console.log(error);
    }
};
/////////////////////////////////////
// Gets details of an uploaded image
/////////////////////////////////////
const getAssetInfo = async (publicId) => {

    // Return colors in the response
    const options = {
      colors: true,
    };  

    try {
        // Get details about the asset
        const result = await cloudinary.api.resource(publicId, options);
        console.log(result);
        return result.colors;
        } catch (error) {
        console.error(error);
    }
};
//////////////////////////////////////////////////////////////
// Creates an HTML image tag with a transformation that
// results in a circular thumbnail crop of the image  
// focused on the faces, applying an outline of the  
// first color, and setting a background of the second color.
//////////////////////////////////////////////////////////////
const createImageTag = (publicId, ...colors) => {

    // Set the effect color and background color
    const [effectColor, backgroundColor] = colors;

    // Create an image tag with transformations applied to the src URL
    let imageTag = cloudinary.image(publicId, {
      transformation: [
        { width: 250, height: 250, gravity: 'faces', crop: 'thumb' },
        { radius: 'max' },
        { effect: 'outline:10', color: effectColor },
        { background: backgroundColor },
      ],
    });

    return imageTag;
};
//////////////////
//
// Main function
//
//////////////////



const models = mongoose.model("engineering",new mongoose.Schema({firstName:"string",secondName:"string",
position:"string",
username:"string",
email:"string",
isAdmin:{type:"Boolean",default:false},
password:"String",
repeatpassword:"string",
// nationalID:{type:"string",length:14,required:true},
url:"string"
}))
console.log(models) 
appRegisterNew.get("/userlists",async (req,res)=>{
  try {
      // loginHandleMongo.find()
  // console.log(loginHandleMongo)
  const finder = await models.find({});
  // console.log(finder)
  res.send(finder)
  } catch (error) {
      console.log(error)
  }
  
  
  })
  appRegisterNew.use(cors({credentials:false}));
  appRegisterNew.get("/userlists",async (req,res)=>{
    try {
        // loginHandleMongo.find()
    // console.log(loginHandleMongo)
    const finder = await loginHandleMongo.find();
    res.send(finder)
    
    } catch (error) {
        console.log(error)
    }
    
    
    })
    
appRegisterNew.post("/file",async(req,res)=>{
  try {
    const form = formidable({ multiples: true });

    
  form.parse(req, async (err, fields, files) => {
    
 
    
        
  console.log(files.image.filepath)
   const result = await cloudinary.uploader.upload(files.image.filepath);
          res.send(result.url)
          
        
        // Upload the image
        
        
      }) } 

    // Get the colors in the image
    

    // Create an image tag, using two of the colors in a transformation
    // const imageTag =   createImageTag(publicId, colors[0][0], colors[1][0]);
    

catch (error) {
  console.log(error);
}

})

appRegisterNew.post("/register",async(req,res)=>{
console.log("register")
  try{

  const findUserName = await models.findOne({username:req.body.username})
  const findEmail = await models.findOne({email:req.body.email})

  
  if(findUserName) return res.send({error:[{message:"username",path:["الاسم مستخدم من قبل"]}]});
  if(findEmail) return res.send({error:[{message:"email",path:["خطأ في الايميل او قد يكون مستدخدم من قبل"]}]});
    // console.log(req.body)
    // console.log(req.body)
const {error} = Joier.validate(req.body)
if (error) return res.send({error:error.details})
// if (error) return res.send(error)
console.log(req.body)
        const newData = new models({
          username:req.body.username,
            firstName:req.body.firstName,
            secondName:req.body.secondName,
            position:req.body.position,
            email:req.body.email,
            password:req.body.password,
            repeatpassword:req.body.password,
            nationalID:req.body.nationalID,
   url:req.body.url         
            
            
            })
            
            
            const jwter = jwt.sign({username:newData.username,
              id:newData._id,
              firstName:newData.firstName,url:newData.url,
              isAdmin:newData.isAdmin},process.env.MYSECRET)
            
            const saver = await newData.save()
            
            res.cookie("token",jwter)
            res.send(jwter)        
    
    }
    catch(error){
console.log(error)
      
    }
})





appRegisterNew.get("/info/:id",async(req,res)=>{


  id=req.params.id
  const finder = await models.findOne({id:id})
  res.send(finder)
})









module.exports.appRegisterNew = appRegisterNew;
module.exports.loginHandleMongo= models
