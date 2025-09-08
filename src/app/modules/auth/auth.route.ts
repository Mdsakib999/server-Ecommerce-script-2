import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "../user/user.controller";
import passport from "passport";
import { AuthController } from "./auth.controller";

const router = Router();

router.get(
  "/google",
  async (req: Request, res: Response, next: NextFunction) => {
    const redirect = req.query.redirect || "/";
    passport.authenticate("google", {
      scope: ["profile", "email"],
      state: redirect as string,
    })(req, res, next);
  }
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=There is some issues with your account. Please contact with out support team!`,
  }),
  AuthController.googleCallbackController
);

export const authRoutes = router;
