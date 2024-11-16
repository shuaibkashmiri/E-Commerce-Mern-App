import express from "express";
import { isAdmin, isAuthenticated } from "./../middlewares/auth.js";
import {
  categoryControlller,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
} from "./../controllers/categoryController.js";

const router = express.Router();

//routes
// create category
router.post(
  "/create-category",
  isAuthenticated,
  isAdmin,
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  isAuthenticated,
  isAdmin,
  updateCategoryController
);

//getALl category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  isAuthenticated,
  isAdmin,
  deleteCategoryCOntroller
);

export default router;
