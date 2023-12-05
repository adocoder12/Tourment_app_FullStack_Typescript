import { Router } from "express";

import authRoute from "./authRoutes";
import categoryRoute from "./categoryRoutes";
import teamRoute from "./teamRoutes";
import playerRoute from "./playerRoutes";

//interfaces
import MessageResponse from "../../interfaces/MessageResponse";

const router = Router();

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "routes: /auth , /users, /categories, /teams , /players",
  });
});

router.use("/auth", authRoute);
router.use("/categories", categoryRoute);
router.use("/teams", teamRoute);
router.use("/players", playerRoute);

export default router;
