// All required import
import express from "express";
import http from "http";
import mongoose from "mongoose";
export const app: express.Application = express();
 
// Config to connect to database 
mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log("connected to database ");
});

// Config to connect to server
let server: http.Server;
server = app.listen(process.env.PORT, () => {
  console.log("connected to server");
});

process.on("unhandledRejection", (err: Error) => {
  console.error(`unhandledRejection Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error("Application is shutting down...");
    process.exit(1);
  });
});
