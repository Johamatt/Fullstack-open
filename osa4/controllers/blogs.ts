import { NextFunction, Request, Response } from "express";
import { BlogT } from "../models/blog";
import { UserT } from "../models/user";
import BlogModel from "../models/blog";

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
    try {
      const blog: BlogT | null = await BlogModel.findById(request.params.id);
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    } catch (error) {
      next(error);
    }
  }
);

blogRouter.post(
  "/",
  async (request: TokenRequest, response: Response, next: NextFunction) => {
    try {
      const body: BlogT = request.body;

      const blog = new BlogModel({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes !== undefined ? body.likes : 0,
        user: request.user._id?.toString(),
      });

      const savedBlog = await blog.save();
      request.user.blogs = request.user.blogs?.concat(savedBlog._id);
      await request.user.save();
      response.status(201).json(savedBlog);
    } catch (error) {
      next(error);
    }
  }
);

blogRouter.delete(
  "/:id",
  async (request: TokenRequest, response: Response, next: NextFunction) => {
    try {
      const blog: BlogT | null = await BlogModel.findById(request.params.id);
      if (blog && blog.user?.toString() === request.user._id?.toString()) {
        await BlogModel.findByIdAndDelete(request.params.id);
        response.status(204).end();
      } else {
        response.status(401).json({ error: "unauthorized" });
      }
    } catch (error) {
      next(error);
    }
  }
);

blogRouter.put(
  "/:id",
  async (request: TokenRequest, response: Response, next: NextFunction) => {
    try {
      const body: BlogT = request.body;
      const blog: any = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes !== undefined ? body.likes : 0,
        user: request.user._id,
      };

      const updatedBlog = await BlogModel.findByIdAndUpdate(
        request.params.id,
        blog,
        {
          new: true,
        }
      );

      response.json(updatedBlog);
    } catch (error) {
      next(error);
    }
  }
);

export default blogRouter;
