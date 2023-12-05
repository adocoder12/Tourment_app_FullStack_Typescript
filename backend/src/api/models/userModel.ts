import { Schema, model } from "mongoose";
const bcrypt = require("bcrypt");
//interfaces
import { User } from "../../interfaces/user";

const userSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  avatar: { type: String },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  createdAt: { type: Date, default: Date.now },
  favoriteTeams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
  myTeam: [{ type: Schema.Types.ObjectId, ref: "Team" }],
});

userSchema.pre<User>("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  console.log("Compare pass");
  const user = this;
  const isMatch = await bcrypt.compare(candidatePassword, user.password);
  return isMatch;
};

module.exports = model<User>("User", userSchema);
