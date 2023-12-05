import e, { Request, Response, NextFunction } from "express";
//interfaces
import { IPlayer } from "../../interfaces/players";
import { ITeam } from "../../interfaces/team";
import DbMessageResponse from "../../interfaces/DbResponse";
//models
const Team = require("../models/teamModel");
const Player = require("../models/playerModel");
//custom error
import CustomError from "../../classes/CustomError";

/*========== get controller ==============*/

const getPlayers = async (req: Request, res: Response, next: NextFunction) => {
  console.log("getPlayers controller: ");
  try {
    const players = await Player.find().populate("club");

    if (!players) {
      next(new CustomError("players not found", 404));
      return;
    }
    res.status(200).json(players);
  } catch (error: string | CustomError | any) {
    next(new CustomError(error.message || "Get categories error", 400));
  }
};

/*========== get player ==============*/

const getPlayer = async (req: Request, res: Response, next: NextFunction) => {
  const playerId = req.params.id;

  try {
    const player = await Player.findById(playerId).populate("club");

    const team = await Team.findById(player?.club);

    if (!team) {
      await Player.findByIdAndUpdate(playerId, { club: null }, { new: true });
    }

    if (!player) {
      next(new CustomError("Player not found", 404));
      return;
    }

    const response: DbMessageResponse = {
      message: "Player found",
      player: player,
    };

    res.status(200).json(response);
  } catch (error: string | CustomError | any) {
    next(new CustomError(error.message || "Get player error", 400));
  }
};

/*========== add controller ==============*/

const addPlayer = async (req: Request, res: Response, next: NextFunction) => {
  console.log("addPlayer controller: ", req.body.age);

  // Check for missing fields

  const updateFields = req.body;

  if (updateFields === undefined || !updateFields) {
    next(new CustomError("Missing fields", 400));
    return;
  }

  const updateObject: Record<string, any> = {};
  for (const key in updateFields) {
    updateObject[key] = updateFields[key];
  }

  try {
    const team: ITeam = await Team.findById(updateObject.teamId);
    console.log("team: ", team);
    const player_name_Exist = await Player.findOne({
      email: updateObject.email,
    });
    const player_number = await Player.findOne({
      number: updateObject.number,
    });

    if (player_number) {
      next(new CustomError(`Number in use  `, 400));
      return;
    }

    if (!team) {
      next(new CustomError("Team not found", 404));
      return;
    }
    if (player_name_Exist) {
      next(new CustomError(`Email in use  `, 400));
      return;
    }

    const player: IPlayer = await Player.create({
      name: updateObject.name,
      lastname: updateObject.lastname,
      position: updateObject.position,
      height: updateObject.height,
      weight: updateObject.weight,
      phone: updateObject.phone,
      email: updateObject.email,
      club: team,
      number: updateObject.number,
      isCaptain: updateObject.isCaptain,
      gender: updateObject.gender,
      category: team.categoryName,
      age: updateObject.age,
    });

    if (team.players?.includes(player)) {
      next(new CustomError("Player already exists in that team", 400));
      return;
    }

    // Add player to team

    await Team.findByIdAndUpdate(
      player.club,
      { $push: { players: player } },
      { new: true }
    ).populate("players");

    // team.players?.push(player);
    // await team.save();

    // console.log("player: ", team.players);

    const response: DbMessageResponse = {
      message: "Player created",
      player: player,
    };

    res.status(201).json(response);
  } catch (error: string | CustomError | any) {
    next(new CustomError(error.message || "Create player error", 400));
  }
};

/*========== update controller ==============*/

const updatePlayer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const updateFields = req.body;
  const playerId = req.params.id;
  console.log("updatePlayer controller: ");

  if (updateFields === undefined || !updateFields) {
    next(new CustomError("Missing fields", 400));
    return;
  }

  const updateObject: Record<string, any> = {};
  for (const key in updateFields) {
    updateObject[key] = updateFields[key];
  }

  try {
    const playerExist = await Player.findById(playerId);

    if (!playerExist) {
      next(new CustomError("Player not found", 404));
      return;
    }

    // Remove player from the current team
    const teamIdBeforeUpdate = playerExist.club;

    await Team.findByIdAndUpdate(
      teamIdBeforeUpdate,
      { $pull: { players: playerExist._id } },
      { new: true }
    );

    const updatedPlayer = await Player.findByIdAndUpdate(
      playerExist._id,
      updateObject,
      { new: true }
    );

    // Add player to the new team
    const updatedTeam = await Team.findByIdAndUpdate(
      updateObject.teamId,
      { $push: { players: playerExist._id } },
      { new: true }
    ).populate("players");

    if (!updatedTeam) {
      next(new CustomError("Team not found", 404));
      return;
    }

    const response: DbMessageResponse = {
      message: "Player updated",
      player: updatedPlayer,
    };

    res.status(201).json(response);
  } catch (error: string | CustomError | any) {
    next(new CustomError(error.message || "Update player error", 400));
  }
};

/*========== delete controller ==============*/

const deletePlayer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const playerId = req.params.id;
  console.log("deletePlayer controller: ", req.params.id);
  try {
    const player = await Player.findById(playerId);

    if (!player) {
      next(new CustomError("Player not found", 404));
      return;
    }

    // Remove player from team
    const updatedTeam = await Team.findByIdAndUpdate(
      player.club,
      { $pull: { players: player._id } },
      { new: true }
    ).populate("players");
    console.log("updatedTeam: ", updatedTeam);

    if (!updatedTeam) {
      next(new CustomError("Team not found", 404));
      return;
    }
    // Delete player
    await Player.findByIdAndDelete(player._id);

    const response: DbMessageResponse = {
      message: "Player deleted",
    };
    res.status(200).json(response);
  } catch (error: string | CustomError | any) {
    next(new CustomError(error.message || "Delete player error", 400));
  }
};

export { getPlayers, addPlayer, deletePlayer, updatePlayer, getPlayer };
