import express from "express";
import {
  loginController,
  registerController,
  testController,
} from "../controllers/authController.js";

import { isAdmin, isAuthenticated } from "../middlewares/auth.js";
//router object
const router = express.Router();

// SignUP Route
router.post("/register", registerController);

// Login Route

router.post("/login", loginController);

//testing

router.get("/test", isAuthenticated, isAdmin, testController);

export default router;
