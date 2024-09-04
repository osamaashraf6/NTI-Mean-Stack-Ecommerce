// All required import
import express from "express";
import mongoose from "mongoose";
export const app: express.Application = express();

// Config to connect to database
mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    console.log("connected to database ");
  })
  .catch((error) => {
    console.log(`Can not Connected DataBase\n error: ${error}`);
  });

// Config to connect to server
app.listen(process.env.PORT, () => {
  console.log("connected to server");
});
