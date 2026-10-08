import Goal from "../models/Goal.js";
export async function list(req,res,next){try{res.json({success:true,goals:await Goal.find({user:req.userId}).sort({createdAt:-1})})}catch(e){next(e)}}
export async function create(req,res,next){try{res.status(201).json({success:true,goal:await Goal.create({...req.body,user:req.userId})})}catch(e){next(e)}}
export async function update(req,res,next){try{const goal=await Goal.findOneAndUpdate({_id:req.params.id,user:req.userId},req.body,{new:true,runValidators:true});if(!goal)return res.status(404).json({success:false,message:"Goal not found."});res.json({success:true,goal})}catch(e){next(e)}}
export async function remove(req,res,next){try{await Goal.findOneAndDelete({_id:req.params.id,user:req.userId});res.json({success:true})}catch(e){next(e)}}