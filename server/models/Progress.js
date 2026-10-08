import mongoose from "mongoose";
const schema=new mongoose.Schema({
 user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true,index:true},
 date:{type:Date,required:true},
 weight:{type:Number},
 bodyFat:{type:Number},
 steps:{type:Number,default:0},
 calories:{type:Number,default:0},
 activeMinutes:{type:Number,default:0},
 workouts:{type:Number,default:0}
},{timestamps:true});
export default mongoose.model("Progress",schema);