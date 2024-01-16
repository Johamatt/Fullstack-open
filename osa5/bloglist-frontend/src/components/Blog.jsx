import { useState } from "react";
import PropTypes from "prop-types";
const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [showMore, setShowMore] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const user = window.localStorage.getItem("loggedBlogappUser");
  return (
    <div style={blogStyle}>
      <div>
        <p>{blog.title}</p>
        <p>{blog.author}</p>
      </div>
      {showMore ? (
        <div>
          <p>{blog.url}</p>
          <p>{blog.likes}</p>
          <button onClick={() => updateBlog(blog)} data-testid='like-btn'>Like</button>
          <p>{blog.user.name}</p>
          {user && JSON.parse(user).username === blog.user.username ? (
            <button onClick={() => deleteBlog(blog.id, blog)}>Delete</button>
          ) : (
            <div />
          )}
        </div>
      ) : (
        <div />
      )}
      <button onClick={() => setShowMore(!showMore)}  data-testid='hide-show-btn'>
        {showMore ? "Hide" : "View"}
      </button>
    </div>
  );
};
Blog.propTypes = {
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
};
export default Blog;
