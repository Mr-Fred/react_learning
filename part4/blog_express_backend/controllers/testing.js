const router = require('express').Router();
const Blog = require('../models/Blog');
const Creator = require('../models/Creator');

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({});
  await Creator.deleteMany({});

  response.status(204).end();
});

module.exports = router;
