import { Request, Response } from "express";
import { User } from "../../models/User";
import { hashfunction } from "../../helpers/hash";

export const signup = async (req: Request, res: Response) => {
  let { username, password } = req.body;

  if (!username || !password) {
    res
      .status(422)
      .json({ success: false, message: "Please enter all required fields" });
  } else {
    const userExists = await User.findOne({ username });

    if (userExists) {
      res.status(422).json({
        success: false,
        message: "user with username already exists",
      });
    } else {
      const user = new User({
        username,
        password,
      });

      try {
        user.password = await hashfunction(user.password);
        try {
          const response = await user.save();
          res.status(200).json({
            success: true,
            data: response,
            message: "User created successfully",
          });
        } catch (err) {
          res.status(500).json({
            success: false,
            message: "User signup failed",
            error: err,
          });
        }
      } catch (err) {
        res.status(500).json({
          success: false,
          message: "Password hashing failed",
          error: err,
        });
      }
    }
  }
};
