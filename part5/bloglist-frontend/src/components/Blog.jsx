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
    <div style={blogStyle} className='blog'>
      <h3>{blog.title} by {blog.author} </h3>
      <button onClick={handleBlogView}>
        {buttonLabel}
      </button>
      <br />
      <div style={fullBlog ? {} : { display: 'none' }} className='blog-details'>
        <span className='blog-url'>Url: {blog.url}</span> <br />
        <span className='blog-likes'>Likes: {blog.likes}</span>
        <button onClick={incrementLikes}>like</button> <br />
        <span className='blog-creator'>Added by: {blog.creator.name}</span>
      </div>
      <br/>
      <button className='blog-remove' onClick={() => deleteBlog(blog)}>remove</button>
    </div>  
  )
}

export default Blog