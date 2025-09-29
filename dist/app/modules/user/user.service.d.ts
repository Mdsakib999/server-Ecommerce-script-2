import { JwtPayload } from "jsonwebtoken";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { Request } from "express";
export declare const UserService: {
    createUserService: (payload: Partial<IUser>) => Promise<{
        _id: import("mongoose").Types.ObjectId;
        name: string;
        email: string;
        phone?: string;
        picture?: string;
        address?: string;
        auths: IAuthProvider[];
        role: Role;
        orders: import("mongoose").Types.ObjectId[];
        isBanned: boolean;
        createdAt?: Date;
        updatedAt?: Date;
        __v: number;
    }>;
    getAllUsersService: (query: Record<string, string>) => Promise<{
        data: (import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
    }>;
    getSingleUser: (id: string) => Promise<{
        data: (import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        }) | null;
    }>;
    getMe: (userId: string) => Promise<{
        data: (import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        }) | null;
    }>;
    updateUserService: (req: Request, userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
};
//# sourceMappingURL=user.service.d.ts.map