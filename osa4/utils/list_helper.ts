import { BlogT } from "../models/blog";
import _ from "lodash";

const dummy = (): any => 1;

const totalLikes = (blogs: Array<BlogT>): number => {
  return blogs.reduce((totalLikes, blog) => totalLikes + blog.likes, 0);
};

const favouriteBlog = (blogs: Array<BlogT>): BlogT => {
  return blogs.reduce((a, b) => (a.likes > b.likes ? a : b));
};

const mostBlogs = (
  blogs: BlogT[]
): { author: string; total: number } | undefined => {
  const blogsByAuthor = _.groupBy(blogs, "author");
  const blogCounts = Object.keys(blogsByAuthor).map((author) => ({
    author,
    total: blogsByAuthor[author].length,
  }));
  const authorWithMostBlogs = _.maxBy(blogCounts, "total");
  return authorWithMostBlogs;
};

const mostLikes = (
  blogs: BlogT[]
): { author: string; likes: number } | undefined => {
  const blogsByAuthor = _.groupBy(blogs, "author");
  const blogCounts = Object.keys(blogsByAuthor).map((author) => ({
    author,
    likes: blogsByAuthor[author].reduce((a, b) => a + b.likes, 0),
  }));

  console.log(blogCounts);

  const authorWithMostBlogs = _.maxBy(blogCounts, "likes");

  console.log(authorWithMostBlogs);
  return authorWithMostBlogs;
};

module.exports = {
  dummy: dummy,
  totalLikes: totalLikes,
  favouriteBlog: favouriteBlog,
  mostBlogs: mostBlogs,
  mostLikes: mostLikes,
};
