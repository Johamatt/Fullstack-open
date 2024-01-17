import { Request, Response } from "express";

import BlogModel from "../models/blog";
import UserModel from "../models/user";

const testRouter = require("express").Router();
testRouter.post("/reset", async (request: Request, response: Response) => {
    await BlogModel.deleteMany({});
    await UserModel.deleteMany({});
    response.status(204).end();
  });

export default testRouter;
