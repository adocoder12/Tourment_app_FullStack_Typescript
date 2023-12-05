import { Router } from "express";

//controllers
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getCategory,
} from "../controllers/categoryController";
const router = Router();

router.get("/getCategories", getCategories);
router.get("/getCategory/:id", getCategory);
router.post("/createCategory", createCategory);
router.put("/updateCategory", updateCategory);
router.put("/deleteCategory", deleteCategory);

export default router;
