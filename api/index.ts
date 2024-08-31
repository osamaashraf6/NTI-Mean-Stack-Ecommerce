import express from "express";
const app: express.Application = express();

app.get("/api/test", (req: express.Request, res: express.Response) => {
  res.status(200).send("Welcome from express with typescript");
});

app.listen(5000, () => {
  console.log("connected to server");
});
