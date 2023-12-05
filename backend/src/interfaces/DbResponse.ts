import { OutputUser } from "../interfaces/user";
import { ITeamResponse } from "../interfaces/team";
import { Icategory } from "../interfaces/team";
import { IPlayer } from "./players";

export default interface DbMessageResponse {
  message: string;
  user?: OutputUser;
  category?: Icategory;
  team?: ITeamResponse;
  player?: IPlayer;
  token?: string;
}
