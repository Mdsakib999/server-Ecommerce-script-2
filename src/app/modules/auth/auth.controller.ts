/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { setAuthCookie } from "../../utils/setCookie";
import { createUserToken } from "../../utils/userToken";
import passport from "passport";
import { AuthServices } from "./auth.service";

const credentialsLogin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: info?.message || "Authentication failed",
        });
      }

      // wrap async work in try/catch
      (async () => {
        try {
          const userTokens = await createUserToken(user);

          const { password: pass, ...rest } = user.toObject();

          setAuthCookie(res, userTokens);

          return res.status(200).json({
            success: true,
            message: "User Logged In Successfully",
            data: {
              accessToken: userTokens.accessToken,
              refreshToken: userTokens.refreshToken,
              user: rest,
            },
          });
        } catch (error) {
          return next(error);
        }
      })();
    })(req, res, next);
  }
);

const getNewAccessToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken || req.headers.authorization;
    if (!refreshToken) {
      throw new Error("No refresh token received from cookies");
    }
    const tokenInfo = await AuthServices.getNewAccessToken(
      refreshToken as string
    );

    setAuthCookie(res, tokenInfo);

    res.status(200).json({
      success: true,
      message: "New Access Token Retrieved Successfully",
      data: tokenInfo,
    });
  }
);

const logout = asyncHandler(
  async (_req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({
      success: true,
      message: "User Logged out Successfully",
      data: null,
    });
  }
);

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
  credentialsLogin,
  logout,
  getNewAccessToken,
  googleCallbackController,
};
