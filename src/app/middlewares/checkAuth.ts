import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import { verifyToken } from "../utils/jwt";

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
        process.env.JWT_ACCESS_SECRET as string
      ) as JwtPayload;

      const isUserExist = await User.findOne({ email: verifiedToken.email });

      if (!isUserExist) {
        throw new Error("User does not exist");
      }
      if (!isUserExist.isVerified) {
        throw new Error("User is not verified");
      }

      if (!authRoles.includes(verifiedToken.role)) {
        throw new Error("You are not permitted to view this route!");
      }

      req.user = verifiedToken;
      next();
    } catch (error) {
      console.log("jwt error", error);
      next(error);
    }
  };
