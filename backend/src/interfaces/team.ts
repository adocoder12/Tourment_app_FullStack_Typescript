import { Document } from "mongoose";

import { IPlayer } from "./players";
import { User } from "./user";

export interface ITeam extends Document {
  name: string;
  shortName: string;
  address: string;
  city: string;
  zipCode?: string;
  phone: string;
  email?: string;
  founded?: number;
  players: IPlayer[];
  staff?: string[];
  badge?: string;
  stats: stats;
  categoryID?: Icategory["_id"][] | string;
  categoryName: Icategory["name"] | string;
  createdAt?: Date;
  owner?: User;
}

interface stats {
  wins: number;
  draws: number;
  loses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  played: number;
}

export interface categoryInfo {
  id: string;
  categoryName: string;
}

export interface ITeamResponse {
  id: string;
  name: string;
  shortName: string;
  address: string;
  city: string;
  zipCode?: string;
  phone: string;
  email?: string;
  founded?: number;
  players?: string[];
  stats: stats;
  owner?: User;
  staff?: string[];
  categoryInfo?: categoryInfo;
}

//interfaces Category
export interface Icategory extends Document {
  name: string;
  teams: ITeam[][];
  createdAt?: Date;
}
