import User from "../models/user.models";
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";

//Register User
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

//Login User
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login Successfully",
      success: true,
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.log("Error in logging user", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

//Get Current User
export const getCurrentUser = async (req:Request, res:Response) => {
  try {
  const user =  await User.findById(req.user.id).select("name email")

  if(!user) {
    return res.status(404).json({
      message: "User not found",
      success: false
    })
  }

  res.status(200).json({
    success: true,
    user
  })
  } catch (error) {
    console.log("Error in getting current user", error);
    return res.status(500).json({
      message:  "Internal server error",
      success: false
    })
  }
}

//Update User Profile
export const updateProfile = async (req: Request, res:Response) => {
  try {
    const {name, email} = req.body

    if(!name || !email || !validator.isEmail(email)) {
      return res.status(400).json({
        message: "Valid name and email required",
        success: false
      })
    }

    const exists = await User.findOne(email, _id: {$ne: req.user.id})

    if(exists) {
      return res.status(400).json({
        message: "email already in use by another account",
        success: false
      })
    }
    const update = await User.findByIdAndUpdate(
      req.user.id,
      {name, email},
      {new: true, runValidators: true, select: "new email"}
    )

    res.status(500).json({
      success: true,
      user
    })
  } catch (error) {
    console.log("Error in updating user profile", error)
    return res.status(500).json({
      message: "Internal server error",
      success: false
    })
  }
}

//Change Password
export const changePassword = async (req: Request, res: Response) => {
  try {
    const {currentPaasword, newPassword}  = req.body
   
  if(!currentPaasword || !newPassword || newPassword.length < 8) {
    return res.status(400).json({
      message: "Password invalid or too short",
      success: false
    })
  }

  const user = await User.findById(req.user.id).select("password")

  if(!user) {
    return res.status(404).json({
      message: "User not found",
      success: false
    })
  }


  const isMatch = await bcrypt.compare(currentPaasword, user.password)
  if(!isMatch) {
    return res.status(401).json({
      message: "Current password incorrect",
      success: false
    })
  }

  user.password = await bcrypt.hash(newPassword, 10)
  await user.save()

  res.status(200).json({
    message: "Password changed",
    success: true
  })
  } catch (error) {
    console.log("Error in changing password", error)
    return res.status(500).json({
      message: "Internal server error",
      success: false
    })
  }
}


//Logout User
export const logoutUser = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};
