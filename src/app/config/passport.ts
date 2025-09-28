/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcryptjs";
import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../modules/user/user.model";
import { Role } from "../modules/user/user.interface";
import { envVariables } from "./envConfig";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done) => {
      try {
        const isUserExists = await User.findOne({ email }).select("+password");

        if (!isUserExists) {
          return done(null, false, { message: "User does not exists" });
        }

        if (isUserExists && isUserExists.isBanned) {
          return done(null, false, {
            message: "You're banned! please contact support",
          });
        }

        const isGoogleAuthenticated = isUserExists?.auths.some(
          (providerObject) => providerObject.provider === "google"
        );

        if (isGoogleAuthenticated && !isUserExists.password) {
          return done(null, false, {
            message: "You have authenticated through Google login!",
          });
        }

        const isPasswordMatched = await bcrypt.compare(
          password,
          isUserExists?.password as string
        );

        if (!isPasswordMatched) {
          return done(null, false, { message: "Invalid credentials" });
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: pass, ...remainingUserData } =
          isUserExists.toObject();

        return done(null, remainingUserData);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: envVariables.GOOGLE_CLIENT_ID as string,
      clientSecret: envVariables.GOOGLE_CLIENT_SECRET as string,
      callbackURL: envVariables.GOOGLE_CALLBACK_URL,
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(null, false, { message: "No email found" });
        }

        let isUserExist = await User.findOne({ email });

        if (isUserExist && isUserExist.isBanned) {
          return done(null, false, {
            message: "You're banned! please contact support",
          });
        }

        const isCredentialsAuthenticated = isUserExist?.auths.some(
          (providerObject) => providerObject.provider === "credentials"
        );
        const isGoogleAuthenticated = isUserExist?.auths.some(
          (providerObject) => providerObject.provider === "google"
        );

        if (isCredentialsAuthenticated && !isGoogleAuthenticated) {
          isUserExist?.auths.push({
            provider: "google",
            providerId: profile.id,
          });
          await isUserExist!.save();
        }

        if (!isUserExist) {
          isUserExist = await User.create({
            email,
            name: profile.displayName,
            picture: profile.photos?.[0]?.value,
            role: Role.CUSTOMER,
            auths: [
              {
                provider: "google",
                providerId: profile.id,
              },
            ],
          });
        }

        return done(null, isUserExist);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
