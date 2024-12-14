const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/Blog');
const Creator = require('../models/Creator');

blogRouter.get('/', async (req, res) => {
  const { token } = req;

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'Token missing or invalid. Please login/sign up to view your blog posts' });
  }

  const blogs = await Blog
    .find({})
    .populate('creator', { username: 1, name: 1, id: 1 });
  res.status(200).json(blogs);
});

blogRouter.get('/:id', async (req, res) => {
  const { token } = req;
  const blog = await Blog.findById(req.params.id);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'Token missing or invalid. Please login/sign up to add a new blog posts' });
  }

  res.status(200).json(blog);
});

blogRouter.post('/', async (req, res) => {
  const { body, token } = req;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'Token missing or invalid. Please login/sign up to add a new blog posts' });
  }

  const creator = await Creator.findById(decodedToken.id);
  if (!creator) {
    return res.status(401).json({ error: 'Creator not found. Please login/sign up to add a new blog post' });
  }

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    creator: creator._id,
  });

  const savedBlog = await newBlog.save();
  creator.blogs = creator.blogs.concat(savedBlog._id);
  await creator.save();
  res.status(201).json(savedBlog);
});

blogRouter.put('/:id', async (req, res) => {
  const { body, creator } = req;
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'Token missing or invalid. Please login/sign up to update a blog posts' });
  }

  const blogToUpdate = await Blog.findById(req.params.id);
  if (!blogToUpdate) {
    return res.status(404).json({ error: 'Requested blog not found' });
  }

  const isCreatorBlogToUpdateOwner = blogToUpdate.creator.toString() === creator._id.toString();
  if (!isCreatorBlogToUpdateOwner) {
    return res.status(403).json({ error: 'You are not authorized to update this blog' });
  }

  const updatedBlog = {
    title: body.title,
    author: body.author,
    creator: creator._id,
    url: body.url,
    likes: body.likes,
  };
  const result = await Blog.findByIdAndUpdate(req.params.id, updatedBlog, {
    new: true,
    runValidators: true,
    context: 'query',
  }).populate('creator', { username: 1, name: 1, id: 1 });
  res.status(200).json(result);
});

// eslint-disable-next-line consistent-return
blogRouter.delete('/:id', async (req, res) => {
  const { token, creator } = req;

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'Token missing or invalid. Please login/sign up to delete a blog posts' });
  }

  const blogToDelete = await Blog.findById(req.params.id);
  if (!blogToDelete) {
    return res.status(204).json({ error: 'Requested blog not found' });
  }

  const isCreatorBlogToDeleteOwner = blogToDelete.creator.toString() === creator._id.toString();
  if (isCreatorBlogToDeleteOwner) {
    await Blog.findByIdAndDelete(req.params.id);
    creator.blogs = creator.blogs.filter((blog) => blog.toString() !== req.params.id);
    await creator.save();
    res.status(204).send('Blog deleted successfully!');
  } else {
    res.status(403).json({ error: 'You are not authorized to delete this blog' });
  }
});

module.exports = blogRouter;
