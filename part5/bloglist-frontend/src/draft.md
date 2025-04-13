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

const handleNotification = (message, type) => {
  setNotification({message, type})
  setTimeout(() => {
    setNotification({message: null, type: null})
  }, 5000)
  }