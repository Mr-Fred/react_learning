import {useState} from 'react'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [fullBlog, setFullBlog ] = useState(false)
  const handleBlogView = () => {
    setFullBlog(!fullBlog)
  }
  const buttonLabel = fullBlog ? 'hide' : 'view'
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const incrementLikes = () => {
    const newBlog = {...blog}
    newBlog.likes = blog.likes + 1
    updateBlog(newBlog)
  }

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}  
      <button onClick={handleBlogView}>
        {buttonLabel}
      </button>
      <br />
      <div style={fullBlog ? {} : { display: 'none' }}>
        Url: {blog.url}<br />
        Likes: {blog.likes}  <button onClick={incrementLikes}>like</button> <br />
        Creator: {blog.creator.name}
      </div>
      <br/>
      <button onClick={() => deleteBlog(blog)}>remove</button>
    </div>  
  )
}

export default Blog