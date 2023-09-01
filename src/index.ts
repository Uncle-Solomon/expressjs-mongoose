import "./lib/db";
import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
// import { PORT } from "./utils/config";
import authRoutes from "./routes/auth";
import { mqttRoute } from "./routes/mqtt";

import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());
app.use(morgan("common"));
app.use(
  helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: false })
);
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.use("/api/v1", authRoutes);
app.use("/api/v1", mqttRoute);

//Server Landing Page
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to an express application by Ameh Solomon Onyeke");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
