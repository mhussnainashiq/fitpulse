import mongoose from "mongoose";
const schema=new mongoose.Schema({
 user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true,index:true},
 name:{type:String,required:true,trim:true},
 type:{type:String,required:true},
 date:{type:Date,required:true},
 duration:{type:Number,required:true,min:1},
 caloriesBurned:{type:Number,default:0,min:0},
 intensity:{type:String,enum:["Low","Medium","High"],default:"Medium"},
 notes:{type:String,default:""}
},{timestamps:true});
export default mongoose.model("Workout",schema);