import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../modules/user/user.interface";
import { generateToken, verifyToken } from "./jwt";
import { User } from "../modules/user/user.model";
import { envVariables } from "../config/envConfig";

export const createUserToken = (user: Partial<IUser>) => {
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    envVariables.JWT_ACCESS_SECRET as string,
    envVariables.JWT_ACCESS_EXPIRES as string
  );

  const refreshToken = generateToken(
    jwtPayload,
    envVariables.JWT_REFRESH_SECRET as string,
    envVariables.JWT_REFRESH_EXPIRES as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const createNewAccessTokenWithRefreshToken = async (
  refreshToken: string
) => {
  const verifiedRefreshToken = verifyToken(
    refreshToken,
    envVariables.JWT_REFRESH_SECRET as string
  ) as JwtPayload;

  const isUserExist = await User.findOne({ email: verifiedRefreshToken.email });

  if (!isUserExist) {
    throw new Error("User does not exist");
  }

  if (isUserExist.isBanned) {
    throw new Error("Your are Banned! Please contact support");
  }

  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };
  const accessToken = generateToken(
    jwtPayload,
    envVariables.JWT_ACCESS_SECRET as string,
    envVariables.JWT_ACCESS_EXPIRES as string
  );

  return accessToken;
};
