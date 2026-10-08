import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

function tokenFor(user){return jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});}
function safe(user){const x=user.toObject();delete x.password;return x;}

export async function register(req,res,next){
 try{
  const {name,email,password}=req.body;
  if(!name||!email||!password)return res.status(400).json({success:false,message:"Name, email and password are required."});
  if(password.length<6)return res.status(400).json({success:false,message:"Password must be at least 6 characters."});
  const exists=await User.findOne({email});
  if(exists)return res.status(409).json({success:false,message:"An account with this email already exists."});
  const hash=await bcrypt.hash(password,12);
  const user=await User.create({name,email,password:hash});
  res.status(201).json({success:true,token:tokenFor(user),user:safe(user)});
 }catch(e){next(e)}
}
export async function login(req,res,next){
 try{
  const {email,password}=req.body; const user=await User.findOne({email});
  if(!user||!(await bcrypt.compare(password,user.password)))return res.status(401).json({success:false,message:"Invalid email or password."});
  res.json({success:true,token:tokenFor(user),user:safe(user)});
 }catch(e){next(e)}
}
export async function me(req,res,next){try{const user=await User.findById(req.userId).select("-password");res.json({success:true,user})}catch(e){next(e)}}
export async function updateProfile(req,res,next){
 try{
  const allowed=["name","email","age","height","weight","fitnessLevel","dailyCalorieGoal","weeklyWorkoutGoal"];
  const payload={};for(const k of allowed)if(req.body[k]!==undefined)payload[k]=req.body[k];
  const user=await User.findByIdAndUpdate(req.userId,payload,{new:true,runValidators:true}).select("-password");
  res.json({success:true,user});
 }catch(e){next(e)}
}