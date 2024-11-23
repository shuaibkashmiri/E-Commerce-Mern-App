import express from "express";
import {
  forgotPasswordController,
  getAllOrdersController,
  getOrdersController,
  loginController,
  orderStatusController,
  registerController,
  testController,
  updateProfileController,
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

//update profile
router.put("/profile", isAuthenticated, updateProfileController);

//orders
router.get("/orders", isAuthenticated, getOrdersController);

//all orders
router.get("/all-orders", isAuthenticated, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  isAuthenticated,
  isAdmin,
  orderStatusController
);
export default router;
