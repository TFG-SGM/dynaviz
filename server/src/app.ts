import express, { Express, Request, Response, json } from "express";
import dotenv from "dotenv";
import { userRouter } from "./routes/user";

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 3000;

app.use(json());
app.disable("x-powered-by");

app.use("/usuario", userRouter);

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
