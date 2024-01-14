import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import { UserT } from "../models/user";
import UserModel from "../models/user";
const usersRouter = Router();

usersRouter.post("/", async (request: Request, response: Response) => {
  try {
    const { username, name, password } = request.body as any;
    const gensalt = await bcrypt.genSalt(10);

    const passwordHash = await bcrypt.hash(password, gensalt);

    const user: UserT = new UserModel({
      username,
      name,
      passwordHash,
    });

    const savedUser: UserT = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    response.status(500).json({ error: "Internal Server Error" });
  }
});

usersRouter.get("/", async (request: Request, response: Response) => {
  try {
    const users: Array<UserT> = await UserModel.find({}).populate("blogs", {
      title: 1,
      author: 1,
    });

    response.json(users);
  } catch (error) {
    response.status(500).json({ error: "Internal Server Error" });
  }
});

export default usersRouter;
