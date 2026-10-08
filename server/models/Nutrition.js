import mongoose from "mongoose";
const schema=new mongoose.Schema({
 user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true,index:true},
 mealName:{type:String,required:true},
 mealType:{type:String,required:true},
 calories:{type:Number,default:0},
 protein:{type:Number,default:0},
 carbs:{type:Number,default:0},
 fats:{type:Number,default:0},
 fiber:{type:Number,default:0},
 water:{type:Number,default:0},
 date:{type:Date,required:true}
},{timestamps:true});
export default mongoose.model("Nutrition",schema);