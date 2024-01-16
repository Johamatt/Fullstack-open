import { useState, useEffect, useRef } from 'react'

const Blog = ({blog, updateBlog, deleteBlog} ) => {
  const [showMore, setShowMore] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

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

        <button onClick={() => deleteBlog(blog.id, blog)}>Delete</button>
      </div>
        ) : 
        <div></div>
      }
      <button onClick={() => setShowMore(!showMore)}>
        {showMore ? "Hide" : "View"}
      </button>
  </div>
)}

export default Blog;