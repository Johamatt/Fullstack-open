const Blog = require("../models/blog");

const { blogsTestDataAPI } = require("../testData/blogsTestData");

const nonExistingId = async () => {
  const blog = new Blog({ author: "dadaa", content: "willremovethissoon" });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};
const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  blogsTestDataAPI,
  nonExistingId,
  blogsInDb,
};
