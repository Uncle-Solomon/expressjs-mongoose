import jwt from "jsonwebtoken";
import { JWTPayload } from "./types";

export const createJwt = (
  payload: JWTPayload,
  secret: string,
  duration: number
) => {
  const token = jwt.sign(payload, secret, { expiresIn: duration });
  return token;
};

export const verifyJwt = (token: any, secret: string) => {
  try {
    const isVerified: any = jwt.verify(token, secret);
    return isVerified;
  } catch {
    return false;
  }
};
