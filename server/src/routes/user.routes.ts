import express from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
  changePassword,
} from "../controllers/user.controller";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/me", getCurrentUser);
userRoutes.put("/profile", updateProfile);
userRoutes.put("/password", changePassword);

export default userRoutes;
