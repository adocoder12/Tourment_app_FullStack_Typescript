import { Router } from "express";

const router = Router();
//controllers
import {
  addTeam,
  getTeams,
  updateTeam,
  deleteTeam,
  getTeamById,
  getTeamByName,
  getTeamsByCategory,
} from "../controllers/teamController";

//multer
import { upload } from "../../multerMidleware";

router.post("/addTeam", upload.single("badge"), addTeam);
router.get("/getTeams", getTeams);
router.get("/getTeam/:id", getTeamById);
router.get("/getTeamByName/:name", getTeamByName);
router.get("/getTeamsByCategory/:id", getTeamsByCategory);
router.put("/updateTeam/:id", updateTeam);
router.delete("/deleteTeam/:id", deleteTeam);

export default router;
