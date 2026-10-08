import Workout from "../models/Workout.js";
import Nutrition from "../models/Nutrition.js";

export async function summary(req,res,next){
 try{
  const now=new Date(); const start=new Date(now); start.setDate(now.getDate()-6); start.setHours(0,0,0,0);
  const workouts=await Workout.find({user:req.userId,date:{$gte:start}}).sort({date:-1});
  const nutrition=await Nutrition.find({user:req.userId,date:{$gte:start}});
  const stats={
   caloriesBurned:workouts.reduce((s,w)=>s+w.caloriesBurned,0),
   activeMinutes:workouts.reduce((s,w)=>s+w.duration,0),
   steps:0,
   workouts:workouts.length
  };
  const days=[];
  for(let i=6;i>=0;i--){const d=new Date(now);d.setDate(now.getDate()-i);const key=d.toISOString().slice(0,10);const day=workouts.filter(w=>new Date(w.date).toISOString().slice(0,10)===key);days.push({day:d.toLocaleDateString(undefined,{weekday:"short"}),calories:day.reduce((s,w)=>s+w.caloriesBurned,0),workouts:day.length});}
  res.json({success:true,stats,recentWorkouts:workouts.slice(0,5),weeklyCalories:days,nutrition:{calories:nutrition.reduce((s,n)=>s+n.calories,0),protein:nutrition.reduce((s,n)=>s+n.protein,0),carbs:nutrition.reduce((s,n)=>s+n.carbs,0),fats:nutrition.reduce((s,n)=>s+n.fats,0)}});
 }catch(e){next(e)}
}