import { NextFunction, Request, Response } from "express";
import { BlogT } from "../models/blog";

const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request: Request, response: Response) => {
  const blogs: Array<BlogT> = await Blog.find({});
  response.json(blogs);
});

blogRouter.get(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const blog = await Blog.findById(request.params.id);
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
  async (request: Request, response: Response, next: NextFunction) => {
    const body = request.body;

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes !== undefined ? body.likes : 0,
    });

    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  }
);

blogRouter.delete(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  }
);

blogRouter.put(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const body = request.body;
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes !== undefined ? body.likes : 0,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });

    response.json(updatedBlog);
  }
);

module.exports = blogRouter;
