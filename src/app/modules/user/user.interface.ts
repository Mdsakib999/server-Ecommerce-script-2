import { Types } from "mongoose";

export enum Role {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
}

export interface IAuthProvider {
  provider: "google" | "credentials";
  providerId: string;
}

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;
  isVerified?: boolean;
  auths: IAuthProvider[];
  role: Role;
  orders: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
