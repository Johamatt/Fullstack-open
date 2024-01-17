import { TYPEMSG } from "../App";
import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog, setMessage }) => {
  const [newBlog, setNewBlog] = useState({ title: "", url: "", author: "" });
  const addBlog = async (event) => {
    const blogObject = {
      title: newBlog.title,
      url: newBlog.url,
      author: newBlog.author,
    };
    try {
      await createBlog(blogObject);
      setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`, TYPEMSG.SUCCESS);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (err) {
      console.log(err);
      setMessage(err.response, TYPEMSG.ERROR);
      setNewBlog({ title: "", url: "", author: "" });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
    setNewBlog({ title: "", url: "", author: "" });
  };

  return (
    <form onSubmit={addBlog} style={{ flexDirection: "column", display: "flex", width: "25%" }} className="blogForm">
      title
      <input
        type="text"
        name="title"
        value={newBlog.title}
        onChange={(event) => setNewBlog({ ...newBlog, title: event.target.value })}
        placeholder='write title here'
        data-testid='blog-title-input'
        id="blog-title-input"
      />
      url
      <input
        type="text"
        name="url"
        value={newBlog.url}
        onChange={(event) => setNewBlog({ ...newBlog, url: event.target.value })}
        placeholder='write url here'
        data-testid='url-input'
        id="url-input"
      />
      author
      <input
        type="text"
        name="author"
        value={newBlog.author}
        onChange={(event) => setNewBlog({ ...newBlog, author: event.target.value })}
        placeholder="write author here"
        data-testid="author-input"
        id="author-input"
      />
      <button type="submit" data-testid="blog-form-btn" style={{ marginTop: 5 }}>save</button>
    </form>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

export default BlogForm;