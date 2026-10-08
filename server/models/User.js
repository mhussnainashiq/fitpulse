import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
 name:{type:String,required:true,trim:true},
 email:{type:String,required:true,unique:true,lowercase:true,trim:true},
 password:{type:String,required:true},
 profileImage:{type:String,default:""},
 age:{type:Number,default:null},
 height:{type:Number,default:null},
 weight:{type:Number,default:null},
 fitnessLevel:{type:Number,default:12},
 dailyCalorieGoal:{type:Number,default:2200},
 weeklyWorkoutGoal:{type:Number,default:6}
},{timestamps:true});
export default mongoose.model("User",userSchema);