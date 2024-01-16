import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
export const TYPEMSG = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR"
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [showBlogForm, setShowBlogForm] = useState(false);
  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortBlogs = blogs.sort((a,b) => b.likes - a.likes);
      setBlogs( sortBlogs );
    }) ;
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUse");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const createBlog = async (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog));
      });
    await blogService.getAll().then(blogs => {
      const sortBlogs = blogs.sort((a,b) => b.likes - a.likes);
      setBlogs( sortBlogs );
    });
  };

  const updateBlog = async (blog) => {
    await blogService.update(blog.id.toString(), { ...blog, likes: blog.likes + 1 });
    await blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );
  };

  const deleteBlogm = async (id, blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(id, blog);
      await blogService.getAll().then(blogs =>
        setBlogs(blogs)
      );}
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password,
      });
      window.localStorage.setItem(
        "loggedBlogappUser", JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (err) {
      setMessage(err.response.data.error, TYPEMSG.ERROR);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );


  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Notification message={message} />
      {!user ? loginForm()
        : <>
          <h2>Blogs</h2>
          <div style={{ marginBottom: 50 }}>
            <p>{user.name} logged in</p>
            <button onClick={() => window.localStorage.removeItem("loggedBlogappUser")}>
              logout
            </button>
          </div>
          {showBlogForm && <BlogForm createBlog={createBlog} setMessage={setMessage}/>}
          <div style={{ marginTop: 10 }}>
            <button style={{ width: "25%" }} onClick={() => setShowBlogForm(!showBlogForm)}>{showBlogForm ? "cancel" : "new blog"}</button>
          </div>
          <div>
            <li>
              <ul>
                {blogs.map((blog, i) => (
                  <Blog
                    key={i}
                    blog={blog}
                    updateBlog={updateBlog}
                    deleteBlog={deleteBlogm}
                  />
                )
                )}
              </ul>
            </li>
          </div>
        </>
      }
    </div>
  );
};

export default App;