import express from "express";
import {
  forgotPasswordController,
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

// forget Password
router.post("/forgot-password", forgotPasswordController);

//protected User route auth
router.get("/user-auth", isAuthenticated, (req, res) => {
  res.status(200).json({ ok: true });
});
//protected Admin route auth
router.get("/admin-auth", isAuthenticated, isAdmin, (req, res) => {
  res.status(200).json({ ok: true });
});

export default router;
