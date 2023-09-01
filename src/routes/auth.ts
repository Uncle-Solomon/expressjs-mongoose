import express from "express";
import { signup } from "../controllers/auth/signup";
import { login } from "../controllers/auth/login";

export const authRoute = express.Router();

authRoute.post("/signup", signup);
authRoute.post("/login", login);
