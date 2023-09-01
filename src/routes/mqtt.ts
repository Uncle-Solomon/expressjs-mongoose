import express from "express";
import { getMessages } from "../controllers/mqtt/getAllMessages";
import { overview } from "../controllers/mqtt/overview";
import { getBoards } from "../controllers/mqtt/getBoards";
import { validateAdmin } from "../middlewares/validateAdmin";
import { test } from "../controllers/mqtt/test";

export const mqttRoute = express.Router();

mqttRoute
  .get("/power-logs", getMessages)
  .get("/power-overview", overview)
  .get("/power-boards", getBoards);

mqttRoute.post("/test", validateAdmin, test);
