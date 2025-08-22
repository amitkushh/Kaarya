import express from "express"
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller"

const userRoutes = express.Router()

userRoutes.post("/register", registerUser)
userRoutes.post("/login", loginUser)
userRoutes.get("/logout", logoutUser)

export default userRoutes