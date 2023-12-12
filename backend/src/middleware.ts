import { Request, NextFunction, Response } from "express";
import CustomError from "./classes/CustomError";
import ErrorResponse from "./interfaces/ErrorResponse";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../src/api/models/userModel");

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError(` 🔍 Not Found ${req.originalUrl}`, 404);
};

const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
    },
  });
};
/* ========= With Basic   and base64  ===== */

// const decoded = Buffer.from(token, "base64").toString("utf8");
// console.log("decoded: " + decoded);
// const [username, password] = decoded.split(":");
const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("auth midleware");
  const { authorization } = req.headers;
  console.log("authorization: " + authorization);

  if (authorization && authorization.startsWith("Basic")) {
    try {
      const token = authorization.split(" ")[1];

      /* ========= With JsonWebToken  and Bearer  ===== */
      // const { username, password } = jwt.verify(
      //   token,
      //   process.env.JWT_SECRET as string
      // );

      /* ========= With Basic   and base64  ===== */

      const decoded = Buffer.from(token, "base64").toString("utf8");
      console.log("decoded: " + decoded);
      const [username, password] = decoded.split(":");
      req.body.username = username;
      req.body.password = password;

      next();
    } catch (error) {
      next(new CustomError(" Request is not authorized", 401));
    }
  }
  if (!authorization) {
    next(new CustomError(" Authorization token required", 401));
    return;
  }
};

export { notFound, errorHandler, authenticate };
