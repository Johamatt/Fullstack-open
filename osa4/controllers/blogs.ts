import { NextFunction, Request, Response } from "express";
import { BlogT } from "../models/blog";
import { UserT } from "../models/user";
import jwt, { JwtPayload } from "jsonwebtoken";
const BlogModel = require("../models/blog");
const UserModel = require("../models/user");
const blogRouter = require("express").Router();

interface TokenRequest extends Request {
  token?: string;
  user: UserT;
}

blogRouter.get("/", async (request: Request, response: Response) => {
  const blogs: Array<BlogT> = await BlogModel.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogRouter.get(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const blog: BlogT | null = await BlogModel.findById(request.params.id);
    response.json(blog);
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
  }
);

blogRouter.post(
  "/",
  async (request: TokenRequest, response: Response, next: NextFunction) => {
    const body: BlogT = request.body;
    const decodedToken = jwt.verify(request.token!, process.env.SECRET!) as any;
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }

    const user: UserT = await UserModel.findById(decodedToken.id);

    const blog = new BlogModel({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes !== undefined ? body.likes : 0,
      user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs?.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  }
);

blogRouter.delete(
  "/:id",
  async (request: TokenRequest, response: Response, next: NextFunction) => {
    const decodedToken = jwt.verify(request.token!, process.env.SECRET!) as any;
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }
    const user: UserT = await UserModel.findById(decodedToken.id);
    const blog: BlogT | null = await BlogModel.findById(request.params.id);
    if (blog!.user!.toString() === user._id!.toString()) {
      await BlogModel.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } else {
      return response.status(401).json({ error: "unauthorized" });
    }
  }
);

blogRouter.put(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const body: BlogT = request.body;
    const blog: BlogT = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes !== undefined ? body.likes : 0,
      user: "",
    };

    const updatedBlog = await BlogModel.findByIdAndUpdate(
      request.params.id,
      blog,
      {
        new: true,
      }
    );

    response.json(updatedBlog);
  }
);

module.exports = blogRouter;
