import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

export const TYPEMSG = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
};

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({title: "", url: "", author: ""})
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  


  const addBlog = (event) => {
    event.preventDefault();

    try {
    const blogObject = {
      title: newBlog.title,
      url: newBlog.url,
      author: newBlog.author,
    };
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setNewBlog({ title: '', url: '', author: '' });
    });
    setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`, TYPEMSG.SUCCESS)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  } catch (err) {
    setMessage(err.response.data.error, TYPEMSG.ERROR)
    setTimeout(() => {
      setMessage(null)
    }, 5000)

  }

  };
  

  const handleLogin = async (event) => {

    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      setMessage(err.response.data.error, TYPEMSG.ERROR)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

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
  )


  const blogForm = () => (
    <form onSubmit={addBlog} style={{flexDirection: 'column', display: 'flex', width: '50%'}}>
      title
      <input
        type="text"
        name="title"
        value={newBlog.title}
        onChange={(event) => setNewBlog({...newBlog, title: event.target.value})}
      />
      url
      <input
        type="text"
        name="url"
        value={newBlog.url}
        onChange={(event) => setNewBlog({...newBlog, url: event.target.value})}
      />
      author
      <input
        type="text"
        name="author"
        value={newBlog.author}
        onChange={(event) => setNewBlog({...newBlog, author: event.target.value})}
      />
      <button type="submit">save</button>
    </form>  
  )


  // title: title,
  // url: url,
  // author: author
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>


      <Notification message={message} />

      {!user ? loginForm() : 
      <>
      <div>
        
      <h2>Blogs</h2>
      <div>
        <p>{user.name} logged in</p>
        <button onClick={() => window.localStorage.removeItem('loggedBlogappUser')}>
          logout
        </button>
      </div>
 
    
         {blogForm()}
      </div>

      <ul>
        {blogs.map((blog, i) => 
          <Blog
            key={i}
            blog={blog} 
            toggleImportance={() => toggleImportanceOf(blog.id)}
          />
        )}
      </ul>
      </>
    }
    {/* <Footer /> */}
    </div>
  )
}

export default App