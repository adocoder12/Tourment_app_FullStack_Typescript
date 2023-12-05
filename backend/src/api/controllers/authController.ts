require("dotenv").config();
import { Request, Response, NextFunction } from "express";
const User = require("../models/userModel");
//interfaces
import DbMessageResponse from "../../interfaces/DbResponse";
import { User, OutputUser } from "../../interfaces/user";
import ErrorResponse from "../../interfaces/ErrorResponse";

import CustomError from "../../classes/CustomError";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isEmail } = require("validator");

const generateToken = (user: OutputUser) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      myTeam: user.myTeam._id,
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

// Get user by id
const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).populate("favoriteTeams myTeam");
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

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    next(new CustomError("Missing credentials", 400));
    return;
  }
  if (!isEmail(email)) {
    next(new CustomError("Email is not valid", 400));
    return;
  }
  if (password.length < 6) {
    next(new CustomError("Password must be at least 6 characters", 400));
    return;
  }
  const usernameExist = await User.findOne({ username });
  const emailExist = await User.findOne({ email });

  if (usernameExist) {
    next(new CustomError("Username already exists", 400));
    return;
  }

  if (emailExist) {
    next(new CustomError("Email already exists", 400));
    return;
  }

  try {
    const user = await User.create({ username, password, email });

    console.log("user: " + user);

    const displayUser: OutputUser = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };

    const token = generateToken(displayUser);

    const response: DbMessageResponse = {
      message: "User created",
      token,
    };
    res.status(201).json(response);
  } catch (error: string | CustomError | any) {
    next(new CustomError(error.message || "Register error", 400));
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("login controller");
    const { username, password } = req.body;

    if (!username || !password) {
      next(new CustomError("Missing credentials", 400));
      return;
    }
    const user = await User.findOne({ username }).populate("myTeam").exec();
    console.log("user: " + user);

    if (!user) {
      next(new CustomError("Wrong Username or Password ", 400));
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!user || !isMatch) {
      next(new CustomError("Wrong Username or Password ", 400));
      return;
    }

    console.log("user: " + user.myTeam._id);

    const displayUser: OutputUser = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      myTeam: user.myTeam[0]?._id,
    };
    const token = generateToken(displayUser);

    const response: DbMessageResponse = {
      message: "Login success",
      token,
    };
    res.status(200).json(response);
  } catch (error: string | CustomError | any) {
    next(new CustomError(error.message || "Login error", 400));
  }
};

export { login, register, getUsers, getUser };
