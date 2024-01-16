import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

const blog = {
  title: "Component testing is done with react-testing-library",
  url: "www.jepjep.com",
  author: "pekka",
  user: {
    name: "jussi",
    username: "unjussi",
  },
  likes: 0,
};

beforeEach(() => {
  cleanup();
});

test("renders content", () => {
  render(<Blog blog={blog} deleteBlog={jest.fn()} updateBlog={jest.fn()} />);
  expect(screen.getByText(blog.title)).toBeDefined();
});

test("after clicking the button, children are displayed", async () => {
  render(<Blog blog={blog} updateBlog={jest.fn()} deleteBlog={jest.fn()} />);
  expect(screen.queryByText(blog.user.name)).toBeNull();
  expect(screen.queryByText(blog.url)).toBeNull();
  expect(screen.queryByText(blog.likes)).toBeNull();

  userEvent.click(screen.getByTestId("hide-show-btn"));
  await waitFor(() => {
    expect(screen.getByText(blog.user.name)).toBeInTheDocument();
    expect(screen.getByText(blog.url)).toBeInTheDocument();
    expect(screen.getByText(blog.likes)).toBeInTheDocument();
  });
});

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = jest.fn();
  render(<BlogForm createBlog={createBlog} setMessage={jest.fn()} />);
  userEvent.type(screen.getByTestId("blog-title-input"), blog.title);
  userEvent.type(screen.getByTestId("url-input"), blog.url);
  userEvent.type(screen.getByTestId("author-input"), blog.author);
  userEvent.click(screen.getByTestId("blog-form-btn"));

  await waitFor(async () => {
    try {
      await expect(createBlog.mock.calls).toHaveLength(1);
      await expect(createBlog.mock.calls[0][0].author).toBe(blog.author);
      await expect(createBlog.mock.calls[0][0].url).toBe(blog.url);
      await expect(createBlog.mock.calls[0][0].title).toBe(blog.title);
    } catch (error) {
      console.error(error);
    }
  });
});

test("test like cb", async () => {
  const updateBlog = jest.fn();
  render(<Blog blog={blog} deleteBlog={jest.fn()} updateBlog={updateBlog} />);
  userEvent.click(screen.getByTestId("hide-show-btn"));

  await waitFor(async () => {
    new Promise((resolve) => setTimeout(resolve, 100));
    userEvent.click(screen.getByTestId("like-btn"));
    userEvent.click(screen.getByTestId("like-btn"));
    await expect(updateBlog.mock.calls).toHaveLength(2);
  });
});
