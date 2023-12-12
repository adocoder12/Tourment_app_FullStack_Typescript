import { Router } from "express";
import { authenticate } from "../../middleware";
import { register, login } from "../controllers/authController";
const router = Router();

router.post("/register", register);
router.post("/login", authenticate, login);

export default router;
