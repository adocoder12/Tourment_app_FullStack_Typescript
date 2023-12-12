import { ITeam } from "./team";

export enum Egenders {
  male = "male",
  female = "female",
}

export interface IPlayer {
  _id?: string;
  name: string;
  lastname: string;
  nickname?: string;
  email: string;
  phone: string;
  height: string;
  weight: string;
  picture?: string;
  nationality?: string;
  age: number;
  gender: Egenders | string;
  category?: string;
  position: Eposition | string;
  number: number;
  teamId: ITeam["_id"] | string;
  previousClubs?: ITeam[] | string[];
  createdAt?: Date;
  injured?: boolean;
  isCaptain?: boolean;
  stats?: IPlayerStats;
}

export enum Eposition {
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
