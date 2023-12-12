import { Router } from "express";

const router = Router();

//controllers

import {
  getPlayers,
  getPlayer,
  addPlayer,
  updatePlayer,
  deletePlayer,
} from "../controllers/playerController";
//multer
import { upload } from "../../multerMidleware";

//routes
router.get("/getPlayers", getPlayers);
router.get("/getPlayer/:id", getPlayer);
router.post("/createPlayer", upload.single("badge"), addPlayer);
router.put("/updatePlayer/:id", updatePlayer);
router.delete("/deletePlayer/:id", deletePlayer);

export default router;
