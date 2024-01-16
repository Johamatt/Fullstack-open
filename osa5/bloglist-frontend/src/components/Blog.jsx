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
        {blog.title} {blog.author}
      </div>
      {showMore ? (
        <div>
          <p>{blog.url}</p>
          <p>{blog.likes}</p>
          <button onClick={() => updateBlog(blog)}>Like</button>
          <p>{blog.user.name}</p>
          {JSON.parse(user).username === blog.user.username ? (
            <button onClick={() => deleteBlog(blog.id, blog)}>Delete</button>
          ) : (
            <div />
          )}
        </div>
      ) : (
        <div />
      )}
      <button onClick={() => setShowMore(!showMore)}>
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
