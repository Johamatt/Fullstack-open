import { NextFunction, Request, Response } from "express";
import { BlogT } from "../models/blog";

const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", (request: Request, response: Response) => {
  Blog.find({}).then((blogs: Array<BlogT>) => {
    response.json(blogs);
  });
});

blogRouter.get(
  "/:id",
  (request: Request, response: Response, next: NextFunction) => {
    Blog.findById(request.params.id)
      .then((blog: BlogT) => {
        if (blog) {
          response.json(blog);
        } else {
          response.status(404).end();
        }
      })
      .catch((error: Error) => next(error));
  }
);

blogRouter.post(
  "/",
  (request: Request, response: Response, next: NextFunction) => {
    const body = request.body;

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    });

    blog
      .save()
      .then((savedBlog: BlogT) => {
        response.json(savedBlog);
      })
      .catch((error: Error) => next(error));
  }
);

blogRouter.delete(
  "/:id",
  (request: Request, response: Response, next: NextFunction) => {
    Blog.findByIdAndDelete(request.params.id)
      .then(() => {
        response.status(204).end();
      })
      .catch((error: Error) => next(error));
  }
);

blogRouter.put(
  "/:id",
  (request: Request, response: Response, next: NextFunction) => {
    const body = request.body;

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    };

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
      .then((updatedBlog: BlogT) => {
        response.json(updatedBlog);
      })
      .catch((error: Error) => next(error));
  }
);

module.exports = blogRouter;
