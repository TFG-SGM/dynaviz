import express, { Express, Request, Response, json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { patientRouter } from "./routes/patient";
import { doctorRouter } from "./routes/doctor";
import { adminRouter } from "./routes/admin";
import { testRouter } from "./routes/test";

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 3000;

app.use(json());
app.use(cors());
app.disable("x-powered-by");

app.use("/patient", patientRouter);
app.use("/doctor", doctorRouter);
app.use("/admin", adminRouter);
app.use("/test", testRouter);

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
