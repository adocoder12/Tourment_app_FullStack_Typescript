import { model, Schema } from "mongoose";
import { Icategory } from "../../interfaces/team";
const Team = require("./teamModel");

const categorieSchema = new Schema<Icategory>({
  name: { type: String, required: true },
  teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = model<Icategory>("Categorie", categorieSchema);
