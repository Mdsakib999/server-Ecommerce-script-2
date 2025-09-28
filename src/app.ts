import express from "express";
import cors from "cors";
import expressSession from "express-session";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { router } from "./app/routes/router";
import passport from "passport";
import "./app/config/passport";
import cookieParser from "cookie-parser";
import { envVariables } from "./app/config/envConfig";

const app = express();

app.use(
  expressSession({
    secret: envVariables.EXPRESS_SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: envVariables.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Unimart backend",
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
