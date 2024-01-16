import { TYPEMSG } from "../App"
import { useState } from 'react'

const BlogForm = ({createBlog, setMessage}) => {

  const [newBlog, setNewBlog] = useState({title: "", url: "", author: ""})

  const addBlog = async (event) => {

    const blogObject = {
      title: newBlog.title,
      url: newBlog.url,
      author: newBlog.author,
    };

    try {
    await createBlog(blogObject);
      setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`, TYPEMSG.SUCCESS)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setNewBlog({ title: '', url: '', author: '' });

  } catch (err) {
    console.log(err)
    setMessage(err.response, TYPEMSG.ERROR)
    setTimeout(() => {
      setMessage(null)
    }, 5000)

  }
}

  return (
  <form onSubmit={addBlog} style={{flexDirection: 'column', display: 'flex', width: '25%'}}>
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
    <button type="submit" style={{marginTop: 5}}>save</button>
  </form>  
  )


 
  };
  
  export default BlogForm


  