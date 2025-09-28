import mongoose from "mongoose";
import app from "./app";
import { envVariables } from "./app/config/envConfig";

const startServer = async () => {
  try {
    await mongoose.connect(envVariables.MONGODB_URL as string);
    console.log("connected to Mongodb ✅");

    app.listen(envVariables.PORT, () => {
      console.log(`server is listening to port ${envVariables.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
