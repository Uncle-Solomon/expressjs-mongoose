import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../../models/User";
import { JWTPayload } from "../../utils/types";
import { createJwt } from "../../utils/jwt";
import { REFRESH_KEY, SECRET_KEY } from "../../utils/config";

export const login = async (req: Request, res: Response) => {
  let { username, password } = req.body;

  if (!username || !password) {
    res.status(422).json({
      success: false,
      message: "Please enter all required fields",
    });
  } else {
    const user = await User.findOne({ username });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "Username does not exist",
      });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Password enetered is incorrect",
        });
      } else {
        let payload: JWTPayload = { user: { username } };
        let accessToken: string = createJwt(payload, SECRET_KEY, 3600);
        let refreshToken: string = createJwt(payload, REFRESH_KEY, 86400);

        res.status(200).json({
          success: true,
          message: "User login successful",
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      }
    }
  }
};
