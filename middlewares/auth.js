import JWT from "jsonwebtoken";
import { messageHandler } from "../helpers/utils.js";
import userModel from "../models/userModel.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return messageHandler(res, 400, "Sign In Required");
    }
    const decode = await JWT.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return messageHandler(res, 400, "UnAuthorized");
    }
    req.user = decode;
    return next();
  } catch (error) {
    console.log(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return messageHandler(res, 400, "Unauthorized Access");
    }
    return next();
  } catch (error) {
    console.log(error);
  }
};
