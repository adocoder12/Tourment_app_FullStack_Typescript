import { Document } from "mongoose";

import { ITeam } from "./team";

export interface IPlayer extends Document {
  name: string;
  lastname: string;
  nickname: string;
  email: string;
  height: number;
  weight: number;
  picture: string;
  nationality: string;
  age: number;
  gender: "male" | "female";
  category: string;
  position: position;
  number: number;
  phone: string;
  club: ITeam | string;
  previousClubs?: ITeam["_id"][] | string[];
  createdAt?: Date;
  injured: boolean;
  isCaptain: boolean;
  stats: IPlayerStats;
}

enum position {
  goalkeeper = "goalkeeper",
  defender = "defender",
  midfielder = "midfielder",
  forward = "forward",
}

export interface IPlayerStats {
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
  matchesPlayed: number;
}
