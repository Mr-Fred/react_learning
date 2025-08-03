const express = require('express');
const { Blog } = require('../Models');
const blogFinder = require('../middlewares/blogFinder');

const blogRouter = express.Router();

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

blogRouter.post('/', async (req, res) => {
  const blog = await Blog.create(req.body);
  return res.json(blog);
});

blogRouter.delete('/:id', blogFinder, async (req, res) => {
  await req.blog.destroy();
  // Operation is idempotent, so we return 204 even if the blog was not found
  return res.status(204).end();
});

blogRouter.put('/:id', blogFinder, async (req, res) => {
  const updatedBlog = await req.blog.update(req.body);
  return res.json(updatedBlog);
});

blogRouter.get('/:id', blogFinder, (req, res) => {
  return res.json(req.blog);
});

module.exports = blogRouter;
