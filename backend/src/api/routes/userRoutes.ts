import { Router } from "express";
import { authenticate } from "../../middleware";
import {
  GetUserteams,
  getUserFavoriteTeams,
  getUsers,
  getUserByID,
  getUserByName,
  updateUser,
} from "../controllers/userController";

const router = Router();

router.get("/users", getUsers);
router.get("/getUserById/:id", getUserByID);
router.get("/getUserTeams/:id", GetUserteams);
router.get("/getUserFavTeams/:id", getUserFavoriteTeams);
router.get("/getUserByName/:username", getUserByName);
router.put("/updateUser/:id", authenticate, updateUser);

export default router;
