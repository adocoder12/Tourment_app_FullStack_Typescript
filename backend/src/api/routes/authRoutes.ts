import { Router } from "express";
import { authenticate } from "../../middleware";
import {
  register,
  login,
  getUser,
  getUsers,
} from "../controllers/authController";
const router = Router();

router.post("/register", register);
router.get("/user/:id", authenticate, getUser);
router.get("/users", getUsers);
router.post("/login", authenticate, login);

export default router;
