import { Schema, model } from "mongoose";
//models
const Categorie = require("../models/categorieModel");

//interfaces
import { ITeam } from "../../interfaces/team";

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  badge: { type: String },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String },
  phone: { type: String, required: true },
  email: { type: String },
  founded: { type: Number, required: true },
  players: [{ type: Schema.Types.ObjectId, ref: "Player" }],
  staff: [{ type: Schema.Types.ObjectId, ref: "Staff" }],
  categoryID: { type: Schema.Types.ObjectId, ref: "Categorie" },
  stats: {
    wins: { type: Number, default: 0 },
    draws: { type: Number, default: 0 },
    loses: { type: Number, default: 0 },
    goalsFor: { type: Number, default: 0 },
    goalsAgainst: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    played: { type: Number, default: 0 },
  },
  categoryName: { type: String },
  createdAt: { type: Date, default: Date.now },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

teamSchema.pre<ITeam>("save", async function (next) {
  try {
    const team = this;

    if (!team.isModified("categorie")) {
      return next();
    }
    const currentCategorie = await Categorie.findById(team.categoryID);
    console.log("currentCategorie: ", currentCategorie);
    this.categoryName = currentCategorie?.name || ""; // Set league equal to category name
    next();
  } catch (error) {
    next(error as Error);
  }
});

module.exports = model<ITeam>("Team", teamSchema);
