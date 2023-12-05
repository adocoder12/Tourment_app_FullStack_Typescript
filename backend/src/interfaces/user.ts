import { Document } from "mongoose";
import { ITeam } from "./team";

interface User extends Document {
  username: string;
  password: string;
  email: string;
  avatar?: string;
  role: "user" | "admin";
  createdAt: Date;
  favoriteTeams?: ITeam["_id"][];
  myTeam?: ITeam["_id"][];
  comparePassword?: (candidatePassword: string) => Promise<boolean>;
}

interface OutputUser {
  id?: string;
  username: string;
  avatar?: string;
  email: string;
  myTeam?: ITeam["_id"];
  role: "user" | "admin";
  favoriteTeams?: ITeam["_id"][];
  password?: string;
  createdAt?: Date;
}

export { User, OutputUser };
