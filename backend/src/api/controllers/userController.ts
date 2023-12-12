import { Request, Response, NextFunction } from "express";
const bcrypt = require("bcrypt");
//models
const User = require("../models/userModel");
const Team = require("../models/teamModel");

//custom error
import CustomError from "../../classes/CustomError";
//interfaces
import DbMessageResponse from "../../interfaces/DbResponse";
import { User, OutputUser } from "../../interfaces/user";
const jwt = require("jsonwebtoken");

const refreshToken = (updatedUser: OutputUser) => {
  return jwt.sign(
    {
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
      favoriteTeams: updatedUser.favoriteTeams,
      myTeam: updatedUser.myTeam._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

//get users
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find().populate("favoriteTeams myTeam");
    if (!users) {
      next(new CustomError("Users not found", 404));
      return;
    }
    res.status(200).json(users);
  } catch (error: string | CustomError | any) {
    next(new CustomError(error.message || "Get users error", 400));
  }
};

//get user by name
const getUserByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username })
      .select(" _id username email role favoriteTeams myTeam")
      .populate("favoriteTeams myTeam");
    if (!user) {
      next(new CustomError("User not found", 404));
      return;
    }
    const displayUser: OutputUser = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      myTeam: user.myTeam._id,
      favoriteTeams: user.favoriteTeams,
    };
    displayUser;

    res.status(200).json({
      message: "User found",
      displayUser,
    });
  } catch (error: string | CustomError | any) {
    next(new CustomError(error.message || "Get user error", 400));
  }
};

// Get user by id
const getUserByID = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id)
      .select(" _id username email role favoriteTeams myTeam")
      .populate("favoriteTeams myTeam");
    if (!user) {
      next(new CustomError("User not found", 404));
      return;
    }
    const displayUser: OutputUser = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      myTeam: user.myTeam._id,
      favoriteTeams: user.favoriteTeams,
    };

    res.status(200).json(displayUser);
  } catch (error: string | CustomError | any) {
    next(new CustomError(error.message || "Get user error", 400));
  }
};

// reset password
const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, newPassword } = req.body;
  const id = req.params.id;

  if (!password || !newPassword) {
    next(new CustomError("Missing fields", 400));
    return;
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      next(new CustomError("User not found", 404));
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      next(new CustomError("Wrong password", 400));
      return;
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      message: "Password changed",
    });
  } catch (error: string | CustomError | any) {
    next(new CustomError(error.message || "Password change error", 400));
  }
};

// Update user
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const updateFields = req.body;

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
    const user = await User.findById(id);

    if (!user) {
      next(new CustomError("User not found", 404));
      return;
    }

    user.username = updateObject.username;
    user.email = updateObject.email;

    const updatedUser = await user.save();

    const displayUser: OutputUser = {
      id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
      myTeam: updatedUser.myTeam._id,
      favoriteTeams: updatedUser.favoriteTeams,
    };
    const token = refreshToken(displayUser);

    res.status(200).json({
      message: "User updated",
      token,
    });
  } catch (error: string | CustomError | any) {
    next(new CustomError(error.message || "Update user error", 400));
  }
};

const GetUserteams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      throw new CustomError("Missing user id", 400);
    }

    const userTeam = await Team.findById(userId).populate(
      "stats categoryID players"
    );

    if (!userTeam) {
      throw new CustomError("User or team not found", 404);
    }

    const response = {
      message: "User Team found",
      team: userTeam,
    };

    res.status(200).json(response);
  } catch (error) {
    if (error instanceof CustomError) {
      next(error);
    } else {
      console.error("Error in GetUserteams:", error);
      next(new CustomError("Get user error", 500)); // Internal Server Error
    }
  }
};

const getUserFavoriteTeams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;

  if (!userId) {
    next(new CustomError("Missing user id", 400));
    return;
  }

  try {
    const user = await User.findById(userId).populate("favoriteTeams");

    if (!user) {
      next(new CustomError("User not found", 404));
      return;
    }

    const response: DbMessageResponse = {
      message: "User favorite Team found",
      team: user.favoriteTeams,
    };

    res.status(200).json(response);
  } catch (error: string | CustomError | any) {
    next(new CustomError(error.message || "Get user error", 400));
  }
};

export {
  GetUserteams,
  getUserFavoriteTeams,
  getUsers,
  getUserByID,
  getUserByName,
  updateUser,
  resetPassword,
};
