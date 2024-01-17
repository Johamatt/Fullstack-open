import { useState } from "react";
import PropTypes from "prop-types";
const Blog = ({ blog, updateBlog, deleteBlog, index }) => {
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
    <div style={blogStyle} className="blog">
      <div>
        <p>{blog.title}</p>
        <p>{blog.author}</p>
      </div>
      {showMore ? (
        <div id="show-more-div">
          <p>{blog.url}</p>
          <p id={`like-value-${index}`} >{blog.likes}</p>
          <button onClick={() => updateBlog(blog)} data-testid='like-btn' id={`like${index}`}>Like</button>
          <p>{blog.user.name}</p>
          {user && JSON.parse(user).username === blog.user.username ? (
            <button id={`delete${index}`}onClick={() => deleteBlog(blog.id, blog)}>Delete</button>
          ) : (
            <div />
          )}
        </div>
      ) : (
        <div />
      )}
      <button onClick={() => setShowMore(!showMore)} id={`view${index}`} data-testid='hide-show-btn'>
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
