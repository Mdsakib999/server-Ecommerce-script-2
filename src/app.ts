import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import expressSession from "express-session";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { router } from "./app/routes/router";
import passport from "passport";

dotenv.config();

const app = express();

app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
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
