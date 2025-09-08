import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { setAuthCookie } from "../../utils/setCookie";
import { createUserToken } from "../../utils/userToken";

const googleCallbackController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let redirectTo = req.query.state ? (req.query.state as string) : "";

    if (redirectTo.startsWith("/")) {
      redirectTo = redirectTo.slice(1);
    }

    const user = req.user;

    if (!user) {
      throw new Error("User Not Found");
    }

    const tokenInfo = createUserToken(user);
    setAuthCookie(res, tokenInfo);

    res.redirect(`${process.env.FRONTEND_URL}/${redirectTo}`);
  }
);

export const AuthController = {
  googleCallbackController,
};
