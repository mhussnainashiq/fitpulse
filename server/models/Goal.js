import mongoose from "mongoose";
const schema=new mongoose.Schema({
 user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true,index:true},
 name:{type:String,required:true},
 type:{type:String,required:true},
 target:{type:Number,required:true},
 current:{type:Number,default:0},
 unit:{type:String,default:""},
 startDate:{type:Date,default:Date.now},
 endDate:{type:Date},
 status:{type:String,default:"active"}
},{timestamps:true});
export default mongoose.model("Goal",schema);