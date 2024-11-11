import userModel from "../models/userModel.js";
import { messageHandler } from "../helpers/utils.js";
import { hashPassword } from "../helpers/authHelper.js";

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
