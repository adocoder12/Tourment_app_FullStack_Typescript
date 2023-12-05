import { Schema, model } from "mongoose";

import { IPlayer } from "../../interfaces/players";

const PlayerSchema = new Schema<IPlayer>({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  nickname: { type: String },
  email: { type: String },
  height: { type: Number, required: true, max: 270 },
  weight: { type: Number, required: true, max: 200 },
  picture: { type: String },
  nationality: [{ type: String, default: "Suomi" }],
  age: { type: Number, required: true },
  phone: { type: String, required: true, max: 20 },
  gender: { type: String, enum: ["male", "female"], required: true },
  category: { type: String, required: true },
  position: {
    type: String,
    enum: ["Goalkeeper", "Defender", "Midfielder", "Forward"],
    required: true,
  },
  number: { type: Number, required: true, max: 99 },
  club: { type: Schema.Types.ObjectId, ref: "Team" },
  previousClubs: [{ type: Schema.Types.ObjectId, ref: "Team" }],
  createdAt: { type: Date, default: Date.now },
  injured: { type: Boolean, default: false },
  isCaptain: { type: Boolean, default: false },
  stats: {
    goals: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    yellowCards: { type: Number, default: 0 },
    redCards: { type: Number, default: 0 },
    minutesPlayed: { type: Number, default: 0 },
    matchesPlayed: { type: Number, default: 0 },
  },
});

module.exports = model<IPlayer>("Player", PlayerSchema);
