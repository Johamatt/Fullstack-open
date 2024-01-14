const { blogsTestDataAPI } = require("../testData/blogsTestData");
// const mongoose = require("mongoose");
import bcrypt from "bcrypt";
import { usersInDb } from "../tests/test_helper";

import * as helper from "./test_helper";
import supertest from "supertest";
import BlogModel from "../models/blog";
import { app } from "../app";
import UserModel from "../models/user";

const api = supertest(app);
let authToken: any;

beforeEach(async () => {
  try {
    await UserModel.deleteMany({});
    await BlogModel.deleteMany({});
  } catch (error) {
    console.log(error);
  }
  const gensalt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash("sekret", gensalt);
  const user = new UserModel({
    username: "root",
    passwordHash,
  });
  await user.save();

  const loginResponse = await api
    .post("/api/login")
    .send({ username: "root", password: "sekret" });
  authToken = loginResponse.body.token;

  try {
    const blogsWithUser = blogsTestDataAPI.map((blog: any) => ({
      ...blog,
      user: user._id.toString(),
    }));
    await BlogModel.insertMany(blogsWithUser);
  } catch (err) {
    console.log(err);
  }
});

test("test id field", async () => {
  const blogsAtStart = await helper.blogsInDb();
  expect(blogsAtStart[0]).toHaveProperty("id");
});

test("blogs without likes have 0 value", async () => {
  const newBlog = {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
  };

  const blog = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${authToken}`)
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
  const contents = response.body.map((r: any) => r.title);
  expect(contents).toContain("React patterns");
});

test("blog post without token return 401", async () => {
  const newBlog = {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  };

  await api.post("/api/blogs").send(newBlog).expect(401);
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${authToken}`)
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
  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${authToken}`)
    .send(newBlog)
    .expect(400);
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.blogsTestDataAPI.length);
});

test("a specific blog can be viewed", async () => {
  const blogsAtStart = await helper.blogsInDb();

  const blogToView = JSON.parse(JSON.stringify(blogsAtStart[0]));

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id.toString()}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(resultBlog.body).toEqual(blogToView);
});

test("a blog can be deleted", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id.toString()}`)
    .set("Authorization", `Bearer ${authToken}`)
    .expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.blogsTestDataAPI.length - 1);
  const authors = blogsAtEnd.map((r: any) => r.author);
  expect(authors).not.toContain(blogToDelete.author);
});

test("a blog can be edited", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];
  const updateLike = blogToUpdate.likes + 1;
  try {
    await api
      .put(`/api/blogs/${blogToUpdate.id.toString()}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: updateLike,
      })
      .expect(200);
  } catch (err) {
    console.log(err);
  }

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd[0].likes).toBeGreaterThan(blogsAtStart[0].likes);
});

// afterAll(async () => {
//   await mongoose.connection.close();
// });
