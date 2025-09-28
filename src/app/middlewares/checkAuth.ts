import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import { verifyToken } from "../utils/jwt";
import { envVariables } from "../config/envConfig";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization || req.cookies.accessToken;

      if (!accessToken) {
        throw new Error("No Token Received");
      }

      const verifiedToken = verifyToken(
        accessToken as string,
        envVariables.JWT_ACCESS_SECRET as string
      ) as JwtPayload;

      const isUserExist = await User.findOne({ email: verifiedToken.email });

      if (!isUserExist) {
        throw new Error("User does not exist");
      }

      if (isUserExist && isUserExist.isBanned) {
        throw new Error("You're banned! please contact support");
      }

      if (!authRoles.includes(verifiedToken.role)) {
        throw new Error("You are not authorized to access this route!");
      }

      req.user = verifiedToken;
      next();
    } catch (error) {
      next(error);
    }
  };
