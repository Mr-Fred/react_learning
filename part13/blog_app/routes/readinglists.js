const express = require('express');
const { ReadingList } = require('../Models');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../utils/errors');

const router = express.Router();

router.use(auth);

router.post('/', async (req, res) => {
  const { blogId } = req.body;
  const userId = req.user.id;

  if (!blogId) {
    return res.status(400).json({ error: 'blogId is required' });
  }

  // Check if the item already exists to prevent duplicates.
  const existingEntry = await ReadingList.findOne({
    where: { userId, blogId }
  });

  if (existingEntry) {
    // 409 Conflict is a suitable status code for a duplicate resource.
    return res.status(409).json({ error: 'The blog is already in your reading list' });
  }

  const readingListItem = await ReadingList.create({ userId, blogId });
  res.status(201).json(readingListItem);
});

router.put('/:id', async (req, res) => {
  // Combine the find and authorization check into a single query.
  const readingListItem = await ReadingList.findOne({
    where: {
      id: req.params.id,
      userId: req.user.id
    }
  });

  if (!readingListItem) {
    // This now handles both "not found" and "not authorized" cases.
    throw new NotFoundError('Reading list item not found or permission denied');
  }

  if (typeof req.body.read !== 'boolean') {
    return res.status(400).json({ error: 'A boolean "read" status is required' });
  }

  readingListItem.read = req.body.read;
  await readingListItem.save();
  res.json(readingListItem);
});

module.exports = router;