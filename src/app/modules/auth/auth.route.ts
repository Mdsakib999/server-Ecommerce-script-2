import passport from "passport";
import { NextFunction, Request, Response, Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();

router.post("/login", AuthController.credentialsLogin);
router.post("/refresh-token", AuthController.getNewAccessToken);
router.post("/logout", AuthController.logout);

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
  (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    passport.authenticate("google", (err: any, user: any, info: any) => {
      if (err) {
        return res.redirect(
          `${process.env.FRONTEND_URL}/login?error=Something went wrong`
        );
      }

      if (!user) {
        return res.redirect(
          `${process.env.FRONTEND_URL}/login?error=${encodeURIComponent(
            info?.message || "Cannot login"
          )}`
        );
      }
      req.user = user;
      return AuthController.googleCallbackController(req, res, next);
    })(req, res, next);
  }
);

export const authRoutes = router;
