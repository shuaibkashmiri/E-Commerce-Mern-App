import userModel from "../models/userModel.js";
import { messageHandler } from "../helpers/utils.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    if (!name || !email || !password || !phone || !address || !answer) {
      return messageHandler(res, 200, "All Credential Required");
    }

    //existing user

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return messageHandler(res, 200, "User Already Registered");
    }

    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      phone,
      password: hashedPassword,
      address,
      answer,
    }).save();
    res
      .status(201)
      .json({ success: true, message: "User Registered Sucessfully", user });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

// Login controller

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return messageHandler(res, 404, "All Credentials Required");
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return messageHandler(res, 404, "User Not Found");
    }
    const matchPass = await comparePassword(password, user.password);
    if (!matchPass) {
      return messageHandler(res, 200, "Incorrect Password");
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(201).json({
      message: "Logged In Sucessfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return messageHandler(res, 500, "Server Error");
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email || !answer || !newPassword) {
      res.status(400).json({ message: "All Fields required" });
    }

    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).json({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

export const testController = (req, res) => {
  res.json({ msg: "This Is Authenticated Route" });
};

export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};
