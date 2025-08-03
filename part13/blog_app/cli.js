'use strict';

/**
 * @fileoverview A command-line interface (CLI) tool to display all blogs from the database.
 *
 * To run this script, use the command: `node cli.js`
 */

require('dotenv').config();
const { sequelize, connectToDatabase } = require('./utils/db');
const Blog = require('./Models/Blog');

const main = async () => {
  try {
    await connectToDatabase();
    const blogs = await Blog.findAll();
    blogs.forEach(blog => {
      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
    });
  } catch (error) {
    console.error('Failed to retrieve blogs:', error);
    process.exit(1); // Exit with an error code
  } finally {
    await sequelize.close();
  }
};

main();