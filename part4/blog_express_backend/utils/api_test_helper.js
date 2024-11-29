const Blog = require('../models/Blog');

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'test author',
  });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const initialBlogs = [
  { title: 'Blog 1', author: 'Robert C. Martin', likes: 10 },
  { title: 'Blog 2', author: 'Edsger W. Dijkstra', likes: 17 },
  { title: 'Blog 3', author: 'Robert C. Martin', likes: 5 },
  { title: 'Blog 4', author: 'Edsger W. Dijkstra', likes: 12 },
  { title: 'Blog 5', author: 'Edsger W. Dijkstra', likes: 3 },
];
module.exports = {
  blogsInDb,
  initialBlogs,
  nonExistingId,
};
