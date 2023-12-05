require("dotenv").config();
import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import path from "path";
//mideleware
import { notFound, errorHandler } from "./middleware";
//routes
import api from "./api/routes/index";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

//CORS
app.use("*", cors());
app.use(function (req: Request, res: Response, next) {
  res.header(
    "Access-Control-Allow-Origin",
    `http://localhost:${process.env.REACT_URI}`
  );

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  res.header("Access-Control-Expose-Headers", "Authorization");

  next();
});

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "API location: api/v1",
  });
});

app.use("/api/v1", api);

app.use(notFound);
app.use(errorHandler);

export default app;
