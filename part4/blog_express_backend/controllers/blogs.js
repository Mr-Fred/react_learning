const blogRouter = require('express').Router();
const Blog = require('../models/Blog');

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.status(200).json(blogs);
});

blogRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.status(200).json(blog);
});

blogRouter.post('/', async (req, res) => {
  const { body } = req;
  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  const savedBlog = await newBlog.save();
  res.status(201).json(savedBlog);
});

blogRouter.put('/:id', async (req, res) => {
  const { body } = req;

  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  const result = await Blog.findByIdAndUpdate(req.params.id, updatedBlog, {
    new: true,
    runValidators: true,
    context: 'query',
  });
  res.status(200).json(result);
});

// eslint-disable-next-line consistent-return
blogRouter.delete('/:id', async (req, res) => {
  const blogToDelete = await Blog.findById(req.params.id);
  if (!blogToDelete) {
    return res.status(204).json({ error: 'Requested blog not found' });
  }
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).send('Blog deleted successfully!');
});

module.exports = blogRouter;
