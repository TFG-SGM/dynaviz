import express, { Express, Request, Response, json } from "express";
import dotenv from "dotenv";
import { userRouter } from "./routes/user";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 3000;

app.use(json());
app.use(cors());
app.disable("x-powered-by");

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
