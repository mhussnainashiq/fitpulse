import { Router } from "express";
import auth from "../middleware/auth.js";
import { register,login,me,updateProfile } from "../controllers/authController.js";
const r=Router();r.post("/register",register);r.post("/login",login);r.get("/me",auth,me);r.put("/profile",auth,updateProfile);export default r;