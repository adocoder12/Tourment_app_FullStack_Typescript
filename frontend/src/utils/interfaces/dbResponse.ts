import { Iuser } from "./user";

export interface IResponse {
  id?: string;
  message: string;
  user?: Iuser;
  token?: string;
}

export interface IErrorResponse {
  message: string;
  stack?: string;
}
