const { blogsTestDataAPI } = require("../testData/blogsTestData");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.blogsTestDataAPI);
});

test("test id field", async () => {
  const blogsAtStart = await helper.blogsInDb();
  expect(blogsAtStart[0]).toHaveProperty("_id");
});

test("blogs without likes have 0 value", async () => {
  const newBlog = {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
  };

  const blog = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  expect(blog.body.likes).toEqual(0);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.blogsTestDataAPI.length);
});

test("a specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs");
  const contents = response.body.map((r) => r.title);
  expect(contents).toContain("React patterns");
});

test("a valid blog can be added ", async () => {
  const newBlog = {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.blogsTestDataAPI.length + 1);
  const authors = blogsAtEnd.map((n) => n.author);

  expect(authors).toContain("Robert C. Martin");
});

test("blog without title/url is not added", async () => {
  const newBlog = {
    author: "duduu",
  };
  await api.post("/api/blogs").send(newBlog).expect(400);
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.blogsTestDataAPI.length);
});

test("a specific blog can be viewed", async () => {
  const blogsAtStart = await helper.blogsInDb();

  const blogToView = JSON.parse(JSON.stringify(blogsAtStart[0]));

  const resultBlog = await api
    .get(`/api/blogs/${blogToView._id.toString()}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(resultBlog.body).toEqual(blogToView);
});

test("a blog can be deleted", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];
  await api.delete(`/api/blogs/${blogToDelete._id.toString()}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.blogsTestDataAPI.length - 1);
  const authors = blogsAtEnd.map((r) => r.author);
  expect(authors).not.toContain(blogToDelete.author);
});

test("a blog can be edited", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];

  const updateLike = blogToUpdate.likes + 1;
  await api
    .put(`/api/blogs/${blogToUpdate._id.toString()}`)
    .send({
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: updateLike,
    })
    .expect(200);
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd[0].likes).toBeGreaterThan(blogsAtStart[0].likes);
});

afterAll(async () => {
  await mongoose.connection.close();
});
