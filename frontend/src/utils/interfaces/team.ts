import { IPlayer } from "./players";

export interface ITeam {
  _id?: string;
  badge?: string;
  name?: string;
  shortName?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  phone?: string;
  email?: string;
  founded?: number;
  stats?: stats;
  players?: IPlayer[];
  staff?: string[];
  categoryId?: string;
  categoryInfo?: IleagueInfo;
}

interface stats {
  played: number;
  wins: number;
  draws: number;
  loses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

export interface IleagueInfo {
  id: string;
  categoryName: string;
}
