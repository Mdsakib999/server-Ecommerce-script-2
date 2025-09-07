import mongoose from "mongoose";
import { Server } from "http";
import app from "./app";

let server: Server;
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    console.log("connected to db");
    server = app.listen(process.env.PORT, () => {
      console.log(`server is listening to port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
