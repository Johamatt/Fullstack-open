import Blog from "../models/blog";
import { blogsTestDataAPI } from "../testData/blogsTestData";
import User from "../models/user";

const nonExistingId = async () => {
  const blog = new Blog({ author: "dadaa", content: "willremovethissoon" });
  await blog.save();
  //@ts-ignore;
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

export { blogsTestDataAPI, nonExistingId, blogsInDb, usersInDb };
