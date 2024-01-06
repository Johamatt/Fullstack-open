const { blogsTestData } = require("../testData/blogsTestData");
const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  const blogs = blogsTestData;
  test("equal likes of all blogs in arr", () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe("favourite blog", () => {
  const blogs = blogsTestData;
  test("return most liked blog from blog arr", () => {
    const result = listHelper.favouriteBlog(blogs);
    expect(result).toEqual(blogsTestData[2]);
  });
});

describe("most blogs", () => {
  const blogs = blogsTestData;
  test("return author with most blogs from blog arr", () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({ author: "Robert C. Martin", total: 3 });
  });
});

describe("author with most likes", () => {
  const blogs = blogsTestData;
  test("Return the author and the sum of likes for the blog post with the highest number of likes from the given array", () => {
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 17 });
  });
});
