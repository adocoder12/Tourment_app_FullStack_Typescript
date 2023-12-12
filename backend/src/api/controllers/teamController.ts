import { Request, Response, NextFunction } from "express";
//models
const Category = require("../models/categorieModel");
const Team = require("../models/teamModel");
const Player = require("../models/playerModel");
const User = require("../models/userModel");

//custom error
import CustomError from "../../classes/CustomError";
//interfaces
import DbMessageResponse from "../../interfaces/DbResponse";
import { ITeamResponse, Icategory } from "../../interfaces/team";

/*========== get Teams by category ==============*/

const getTeamsByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categoryId = req.params.id;
  console.log("getTeamsByCategory controller: ");

  try {
    const category = await Category.findById(categoryId).populate("teams");

    if (!category) {
      next(new CustomError("Category not found", 404));
      return;
    }

    const response: DbMessageResponse = {
      message: "Category found",
      category: category,
    };

    res.status(200).json(response);
  } catch (error: string | CustomError | any) {
    next(new CustomError(error.message || "Get category error", 400));
  }
};

/*========== get Team ==============*/

const getTeams = async (req: Request, res: Response, next: NextFunction) => {
  console.log("getTeams controller: ");
  try {
    const teams = await Team.find().populate("players categoryID");

    if (!teams) {
      next(new CustomError("teams not found", 404));
      return;
    }
    res.status(200).json(teams);
  } catch (error: string | CustomError | any) {
    next(new CustomError(error.message || "Get categories error", 400));
  }
};
/*========== get team by name ==============*/
const getTeamByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("getTeamByName controller: ");
  const { name } = req.params;
  try {
    const team = await Team.findOne({ name }).populate("players categoryID");

    if (!team) {
      next(new CustomError("Team not found", 404));
      return;
    }

    const response: DbMessageResponse = {
      message: "Team found",
      team: team,
    };

    res.status(200).json(response);
  } catch (error: string | CustomError | any) {
    next(new CustomError(error.message || "Get team error", 400));
  }
};

/*========== get team by id ==============*/
const getTeamById = async (req: Request, res: Response, next: NextFunction) => {
  console.log("getTeamById controller: ");
  const { id } = req.params;

  try {
    const team = await Team.findById(id).populate("players categoryID");

    if (!team) {
      next(new CustomError("Team not found", 404));
      return;
    }

    const response: DbMessageResponse = {
      message: "Team found",
      team: team,
    };

    res.status(200).json(response);
  } catch (error: string | CustomError | any) {
    next(new CustomError(error.message || "Get team error", 400));
  }
};

/*========== add controller ==============*/

const addTeam = async (req: Request, res: Response, next: NextFunction) => {
  console.log("addTeam controller: ");
  const {
    name,
    shortName,
    address,
    city,
    zipCode,
    phone,
    email,
    founded,
    categoryId,
    userId,
  } = req.body;
  const logoPath = req.file?.path;
  console.log(userId, categoryId);

  const updateFields = req.body;

  if (!logoPath) {
    next(new CustomError("Upload Team badge", 400));
    return;
  }

  // Check for missing fields

  if (updateFields === undefined || !updateFields) {
    next(new CustomError("Missing fields", 400));
    return;
  }

  const updateObject: Record<string, any> = {};
  for (const key in updateFields) {
    updateObject[key] = updateFields[key];
  }

  try {
    const category: Icategory = await Category.findById(categoryId);
    const team_name_Exist = await Team.findOne({ name });
    const userExist = await User.findById(userId).populate("myTeam");
    console.log("userExist", category);

    if (!userExist) {
      next(new CustomError("User not found", 404));
      return;
    }

    if (!category) {
      next(new CustomError("Categorie or team not found", 404));
      return;
    }
    if (team_name_Exist) {
      next(new CustomError("Team name  or email in use", 400));
      return;
    }

    const team = await Team.create({
      name: name,
      shortName: shortName,
      badge: logoPath,
      address: address,
      city: city,
      zipCode: zipCode,
      phone: phone,
      email: email,
      founded: founded,
      categoryID: category._id,
      categoryName: category.name,
      owner: userExist,
    });

    //Add team to user
    await User.findByIdAndUpdate(
      userId,
      { $push: { myTeam: team._id } },
      { new: true }
    );

    //Add team to category
    if (category.teams.includes(team)) {
      next(new CustomError("Team already exists in that category", 400));
      return;
    }

    await Category.findByIdAndUpdate(categoryId, {
      $push: { teams: team },
    });

    const newTeam: ITeamResponse = {
      id: team._id,
      name: team.name,
      shortName: team.shortName,
      address: team.address,
      city: team.city,
      zipCode: team.zipCode,
      phone: team.phone,
      email: team.email,
      founded: team.founded,
      owner: team.owner,
      stats: team.stats,
      categoryInfo: {
        id: team.categoryID,
        categoryName: team.categoryName,
      },
    };

    const response: DbMessageResponse = {
      message: `Team added  succsesfully to ${newTeam.categoryInfo?.categoryName} !`,
      team: newTeam,
    };

    res.status(200).json(response);
  } catch (error: string | CustomError | any) {
    next(new CustomError(error.message || "Add team error", 400));
  }
};

/*========== Update controller ==============*/
const updateTeam = async (req: Request, res: Response, next: NextFunction) => {
  console.log("updateTeam controller: ");
  const teamId = req.params.id;
  const updateFields = req.body;

  const updateObject: Record<string, any> = {};
  for (const key in updateFields) {
    updateObject[key] = updateFields[key];
  }

  console.log("updateObject: ", updateObject);

  // Check for missing fields
  if (req.body) {
    next(new CustomError("Missing fields", 400));
    return;
  }

  const updatedTeam = await Team.findByIdAndUpdate(teamId, updateObject, {
    new: true,
  });

  if (!updatedTeam) {
    next(new CustomError(`Team not found `, 400));
    return;
  }

  const response: DbMessageResponse = {
    message: `Team updated  succsesfully !`,
    team: updatedTeam,
  };
  res.status(201).json(response);
};

/*========== Delete controller ==============*/

const deleteTeam = async (req: Request, res: Response, next: NextFunction) => {
  const teamId = req.params.id;

  // Check for missing fields
  console.log("teamId: ", teamId);

  if (!teamId) {
    next(new CustomError(`Missing ${req.params.id}`, 400));
    return;
  }

  try {
    const team = await Team.findById(teamId);
    const players = await Player.find({ club: teamId });

    if (!team) {
      for (const player of players) {
        await player.Update(
          {
            $unset: { club: team._id },
          },
          { new: true }
        );
      }
      next(new CustomError("Team not found", 404));
      return;
    }

    const categorie = await Category.findById(team.categoryID);

    if (!categorie) {
      next(new CustomError("Categorie not found", 404));
      return;
    }
    // Update the Category to remove the team
    await Category.findByIdAndUpdate(
      team.categoryID,
      {
        $pull: { teams: team._id },
      },
      { new: true }
    );

    // Update the owner's myTeam object
    await User.findByIdAndUpdate(
      team.owner._id,
      // { $unset: { [`myTeam.${teamId}`]: 1 } },
      { $pull: { myTeam: team._id } },
      { new: true }
    );

    // Delete the team
    await Team.findByIdAndDelete(team._id);

    const response: DbMessageResponse = {
      message: `Team deleted  succsesfull !`,
    };

    res.status(200).json(response);
  } catch (error: string | CustomError | any) {
    next(new CustomError(error.message || "Delete team error", 400));
  }
};

export {
  getTeams,
  addTeam,
  deleteTeam,
  updateTeam,
  getTeamById,
  getTeamByName,
  getTeamsByCategory,
};
