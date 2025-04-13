const jwt = require('jsonwebtoken');
const logger = require('./logger');
const Creator = require('../models/Creator');
const Blog = require('../models/Blog');

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  } if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return res.status(400).json({ error: 'expected `username` to be unique' });
  } if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' });
  } if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired' });
  }
  next(error);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('Authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '');
  }
  next();
};

const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'Token missing or invalid. Please login/sign up to delete a blog posts' });
  }
  const creator = await Creator.findById(decodedToken.id);
  if (!creator) {
    return res.status(401).json({ error: 'Creator not found. Please login/sign up to delete a blog posts' });
  }
  req.creator = creator;
  next();
};

// Validate token helper function
const validateToken = (token, res) => {
  if (!token && jwt.verify(token, process.env.SECRET)) {
    return res.status(401).json({ error: 'Token missing or invalid. Please login/sign up to add a comment' });
  }
};

// Validate blog helper function
const validateBlog = async (blogId, res) => {
  const blog = await Blog.findById(blogId);
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' });
  }
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

module.exports = {
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
  validateToken,
  validateBlog,
};
