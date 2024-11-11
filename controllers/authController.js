import userModel from "../models/userModel.js";
import { messageHandler } from "../helpers/utils.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
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
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return messageHandler(res, 500, "Server Error");
  }
};
