'use strict';
/** * @fileoverview Middleware to find a blog by ID
 * This middleware retrieves a blog post from the database based on the ID provided in the request parameters
 * and attaches it to the request object for further processing in the route handlers.
 */

const { Blog } = require('../Models');

const blogFinder = async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    req.blog = blog;
    return next();
  }
  return res.status(404).json({ error: 'Blog not found' });
};

module.exports = blogFinder;