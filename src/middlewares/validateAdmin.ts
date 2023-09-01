import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";
import { REFRESH_KEY, SECRET_KEY } from "../utils/config";

export const validateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers.accesstoken;
  console.log(req.headers);
  const refreshToken = req.headers["refreshToken"];

  console.log(accessToken);
  console.log(refreshToken);

  if (accessToken) {
    const payload = verifyJwt(accessToken, SECRET_KEY);
    if (payload) {
      return next();
    }
  }
  if (refreshToken) {
    const payload = verifyJwt(refreshToken, REFRESH_KEY);
    if (payload) {
      return next();
    }
  }

  res.status(500).json({
    success: false,
    message: "Authorization failed: Refresh and Access Token missing",
  });
};
