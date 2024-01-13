import { Request, Response } from "express";
import bcrypt = require("bcrypt");
import UserModel, { UserT } from "../models/user";

const usersRouter = require("express").Router();

usersRouter.post("/", async (request: Request, response: Response) => {
  const { username, name, password } = request.body as UserT;
  const gensalt = await bcrypt.genSalt(10);

  const passwordHash = await bcrypt.hash(password, gensalt);

  const user: UserT = new UserModel({
    username,
    name,
    passwordHash,
  });

  const savedUser: UserT = await user.save();
  response.status(201).json(savedUser);
});

usersRouter.get("/", async (request: Request, response: Response) => {
  const users: Array<UserT> = await UserModel.find({}).populate("blogs", {
    title: 1,
    author: 1,
  });

  response.json(users);
});

module.exports = usersRouter;
