import { Types } from "mongoose";
export declare enum Role {
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER"
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
    auths: IAuthProvider[];
    role: Role;
    orders: Types.ObjectId[];
    isBanned: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
//# sourceMappingURL=user.interface.d.ts.map