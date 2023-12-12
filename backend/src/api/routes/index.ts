import { Router } from "express";

import authRoute from "./authRoutes";
import categoryRoute from "./categoryRoutes";
import teamRoute from "./teamRoutes";
import playerRoute from "./playerRoutes";
import userRoute from "./userRoutes";

//interfaces
import MessageResponse from "../../interfaces/MessageResponse";

const router = Router();

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "routes: /auth , /users /users, /categories, /teams , /players",
  });
});

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/categories", categoryRoute);
router.use("/teams", teamRoute);
router.use("/players", playerRoute);

export default router;
