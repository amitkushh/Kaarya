import User from "../models/user.models";
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are Required",
        success: false,
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be atleast 8 characters long",
        success: false,
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exist, please login",
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "24h",
    });

    await user.save();

    res.status(201).json({
      message: "User Created Successfully",
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.log("Error in registring user", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};
