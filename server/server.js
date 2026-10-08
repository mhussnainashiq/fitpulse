import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import nutritionRoutes from "./routes/nutritionRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app=express();
app.use(cors());
app.use(express.json());

app.get("/api/health",(req,res)=>res.json({success:true,message:"FitPulse API is running"}));
app.use("/api/auth",authRoutes);
app.use("/api/workouts",workoutRoutes);
app.use("/api/goals",goalRoutes);
app.use("/api/nutrition",nutritionRoutes);
app.use("/api/progress",progressRoutes);
app.use("/api/dashboard",dashboardRoutes);

app.use((err,req,res,next)=>{
 console.error(err);
 res.status(err.status||500).json({success:false,message:err.message||"Server error"});
});

const port=process.env.PORT||5000;
mongoose.connect(process.env.MONGO_URI||"mongodb://127.0.0.1:27017/fitpulse")
 .then(()=>app.listen(port,()=>console.log(`FitPulse API running on http://localhost:${port}`)))
 .catch(err=>{console.error("MongoDB connection failed:",err.message);process.exit(1)});
