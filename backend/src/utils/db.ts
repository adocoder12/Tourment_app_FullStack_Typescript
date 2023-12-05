require("dotenv").config();
import mongoose from "mongoose";

const mongoConnect = async () => {
  const connection = await mongoose.connect(process.env.DATABASE_URL as string);
  console.log("DB connected successfully");
  return connection;
};

export default mongoConnect;
