import { useState, useEffect, useRef } from 'react'
// Ui Components
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Toggleable'

// Services
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: null,
    type: null
  })

  const blogFormRef = useRef()

  useEffect( () => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    const fetchBlogs = async () => {
      if (user) {
        const blogs = await blogService.getAll();
        const sortedBlogs = blogs ? blogs.sort((a, b) => b.likes - a.likes) : [];
        setBlogs(sortedBlogs);
      }
    };
    fetchBlogs();
  }, [user]);
  

  const handleNotification = (message, type) => {
    setNotification({message, type})
    setTimeout(() => {
      setNotification({message: null, type: null})
    }, 5000)
    }

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedInBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      handleNotification('You have successfully logged in', 'success')
    
    } catch (exception) {
     handleNotification('Wrong credentials', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    handleNotification('You have successfully logged out', 'success')
  }

  const createBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      blogFormRef.current.toggleVisibility()
      handleNotification(`A new blog ${newBlog.title} by ${newBlog.author} added`, 'success')
    } catch (exception) {
      handleNotification('Something went wrong', 'error')
    }
  }
  
  const updateBlog = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject)
      setBlogs(blogs.map(
        blog => blog.id === updatedBlog.id ? updatedBlog : blog
      ))
      handleNotification(`Blog ${updatedBlog.title} has been updated`, 'success')
    } catch (error) {
      handleNotification('Something went wrong', 'error')
    }
  }
  const deleteBlog = async (blog) => {
    try {
      if(window.confirm(`Warning!! Delete ${blog.title}??`)){
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => blog.id !== b.id))
        handleNotification(`Blog ${blog.title} deleted successfully!`, 'success')
      }
    } catch (error) {
      console.log(error)
      handleNotification('Something went wrong', 'error')
    }
  }
  return (
    <div>
      {user === null ?
        <div>
          <Notification notification={notification} />
          <h2>Log in to application</h2>
          <Togglable buttonLabel='login'>
            <LoginForm
              username={username}
              password={password}
              handleLogin={handleLogin}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          </Togglable>
        </div>
        : <div>
            <p>{user.name} logged in</p> 
            <button onClick={handleLogout}>logout</button>
            <Notification notification={notification} />
            <hr />
            <h2>BLOGS</h2>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
            )}
            <Togglable buttonLabel='New blog' ref={blogFormRef}>
            <BlogForm 
              createBlog={createBlog} 
            />
            </Togglable>
          </div>
      }
    </div>
 )
}

export default App