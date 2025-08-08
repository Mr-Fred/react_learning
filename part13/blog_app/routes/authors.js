const express = require('express');
const { Blog } = require('../Models');
const { sequelize } = require('../utils/db');

const router = express.Router();

router.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      'author',
      // sequelize.fn allows us to call SQL functions.
      // We count the number of blogs and alias it as 'articles'.
      [sequelize.fn('COUNT', sequelize.col('id')), 'articles'],
      // We sum the likes and alias it as 'likes'.
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
    ],
    // Group the results by the author's name to aggregate the data correctly.
    group: ['author'],
    order: [[sequelize.literal('likes'), 'DESC']],
  });
  res.json(authors);
});

module.exports = router;