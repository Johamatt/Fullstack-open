import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import bcrypt = require("bcrypt");
import UserModel from "../models/user";

const loginRouter = require("express").Router();
loginRouter.post("/", async (request: Request, response: Response) => {
  const { username, password } = request.body as any;

  const user = await UserModel.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  if (!process.env.SECRET) {
    return response.status(500);
  }

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

export default loginRouter;
