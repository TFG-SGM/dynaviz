import express, { Express, json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { authRouter } from "./routes/auth";
import { userAuth } from "./middlewares/userAuth";
import { patientRouter } from "./routes/patient";
import { doctorRouter } from "./routes/doctor";
import { adminRouter } from "./routes/admin";
import { testRouter } from "./routes/test";
import { testTypeRouter } from "./routes/testTypes";
import { fileRouter } from "./routes/file";
import { modelPaintedRouter } from "./routes/modelPainted";

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 3000;

app.use(json());
app.use(cors());
app.disable("x-powered-by");

app.use("/auth", authRouter);

app.use(userAuth);

app.use("/patient", patientRouter);
app.use("/doctor", doctorRouter);
app.use("/admin", adminRouter);
app.use("/test", testRouter);
app.use("/testType", testTypeRouter);
app.use("/file", fileRouter);
app.use("/modelPainted", modelPaintedRouter);

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
