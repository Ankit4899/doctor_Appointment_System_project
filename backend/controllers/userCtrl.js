const userModel = require('../models/userModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const registerController = async(req,res) =>{
try{
  const existingUser = await userModel.findOne({email:req.body.email})
  if(existingUser){
    return res.status(200).send({message:'user already exist', success:false})
  }
  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password,salt);
  req.body.password = hashedPassword;

  const newUser  = new userModel(req.body);
  await newUser.save();res.status(201).send({message:'Registered successfully',success:true});
}catch(err){
    console.log(err);
    res.status(500).send({success:  false, message:`register controller ${err.message}`});
}
}



const loginController = async (req,res)=>{
  try{
    const user = await userModel.findOne({email:req.body.email});
    if(!user){
      return res.status(200).send({message:'user not found',success:false});
    }
    const isMAtch = await bcrypt.compare(req.body.password,user.password);
    if(!isMAtch){
      return res.status(200).send({message:'Invalid email or password',success:false});
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn : '1d'});
    res.status(200).send({message:'Login success',success:true,token:token});
  }catch(err){
    console.log(err);
    res.status(500).send({message:`Error in Login ${err.message}`});
  }
}


const authController=async (req,res)=>{
try{
const user = userModel.findOne({_id:req.body.userId});
if(!user){
  return res.status(200).send({message:`user not found`,success:false});
}else{
res.status(200).send({success:true,data:{
  name:user.name,
  email:user.email
}})
}
}catch(err){
  console.log(err);
  res.status(500).send({message:`Error in Authorization ${err.message}`,success:false});
}
}
module.exports = {loginController,registerController,authController};