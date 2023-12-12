import { ITeam } from "./team";
// export interface Iauth {
//   id?: string;
//   username?: string;
//   email?: string;
//   password?: string;
//   myTeam?: ITeam;
//   role?: string;
//   createdAt?: string;
// }

export interface Iuser {
  id?: string;
  username?: string;
  email?: string;
  avatar?: string;
  myTeam?: string | ITeam["_id"];
  role?: string;
  createdAt?: string;
}

export interface Iauth extends Iuser {
  username?: string;
  email?: string;
  password?: string;
}
