import { IUser } from "../modules/user/user.interface";
export declare const createUserToken: (user: Partial<IUser>) => {
    accessToken: string;
    refreshToken: string;
};
export declare const createNewAccessTokenWithRefreshToken: (refreshToken: string) => Promise<string>;
//# sourceMappingURL=userToken.d.ts.map