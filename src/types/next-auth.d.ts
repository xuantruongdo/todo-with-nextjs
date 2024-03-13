import { IUser } from "./user.interface";

declare module "next-auth" {
  interface Session {
    user: IUser;
    access_token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: IUser;
    access_token: string;
  }
}

export interface IResponseLogin{
  access_token: string;
  user: {
    id: number;
    fullName: string;
    email: string;
  }
}