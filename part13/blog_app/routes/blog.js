const express = require('express');
const Blog = require('../Models/Blog');

const blogRouter = express.Router();

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

blogRouter.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    return res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = blogRouter;
