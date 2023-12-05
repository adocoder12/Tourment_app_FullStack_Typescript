import { ITeam } from "./team";
//interfaces Category
export interface Icategory {
  id: string;
  name: string;
  teams: ITeam[];
  createdAt?: Date;
}
