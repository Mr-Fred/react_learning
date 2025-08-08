const express = require('express');
const { Op } = require('sequelize');
const { Blog, User } = require('../Models');
const blogFinder = require('../middlewares/blogFinder');
const auth = require('../middlewares/auth');
const { isAuthorizedUser } = require('../utils/helpers');

const blogRouter = express.Router();

blogRouter.get('/', auth, async function getAllBlogs (req, res) {
  let where = {};

  if (req.query.search) {
    let searchTerm = `%${req.query.search}%`;
    where[Op.or] = [
      {
        title: {
          // Use iLike for case-insensitive search in PostgreSQL
          [Op.iLike]: searchTerm
        }
      },
      {
        author: {
          [Op.iLike]: searchTerm
        }
      }
    ];
  }

  const blogs = await Blog.findAll({
    include: {
      model: User,
      attributes: ['name', 'username'] // Select only specific, non-sensitive user fields
    },
    where,
    order: [
      ['likes', 'DESC']
    ]
  });
  res.json(blogs);
});

blogRouter.post('/', auth, async function createBlog (req, res) {
  // req.user is the full user instance, attached by the auth middleware
  // The global errorHandler will catch validation errors, so try/catch is not needed here.
  const blog = await Blog.create({ ...req.body, userId: req.user.id });
  return res.json(blog);
});

blogRouter.delete('/:id', auth, blogFinder, async function deleteBlog (req, res) {
  // Let isAuthorizedUser throw an error, which will be caught by the errorHandler.
  isAuthorizedUser(req.blog.userId, req.user.id);
  await req.blog.destroy();
  return res.status(204).end();
});

blogRouter.put('/:id', auth, blogFinder, async function updateBlogLikes (req, res) {
  // Let isAuthorizedUser throw an error if not permitted.
  isAuthorizedUser(req.blog.userId, req.user.id);

  // Then, validate the request body.
  if (req.body.likes !== undefined) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    return res.json(req.blog);
  }
  return res.status(400).json({ error: 'The "likes" property is required for an update' });
});

blogRouter.get('/:id', auth, blogFinder, async function getSingleBlog (req, res) {
  // Let isAuthorizedUser throw an error, which will be caught by the errorHandler.
  isAuthorizedUser(req.blog.userId, req.user.id);
  return res.json(req.blog);
});

module.exports = blogRouter;
