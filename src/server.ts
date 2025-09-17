import mongoose from "mongoose";
import app from "./app";

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("connected to Mongodb ✅");

    app.listen(process.env.PORT, () => {
      console.log(`server is listening to port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
