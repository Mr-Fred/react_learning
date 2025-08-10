const express = require('express');
const { ReadingList } = require('../Models');
const auth = require('../middlewares/auth');
const checkDisabled = require('../middlewares/checkDisabled');
const { AuthorizationError, NotFoundError } = require('../utils/errors');

const router = express.Router();

router.use(auth, checkDisabled);

router.post('/', async (req, res) => {
  const { blogId } = req.body;
  const userId = req.user.id;

  if (!blogId) {
    return res.status(400).json({ error: 'blogId is required' });
  }

  const readingListItem = await ReadingList.create({ userId, blogId });
  res.status(201).json(readingListItem);
});

router.put('/:id', async (req, res) => {
  const readingListItem = await ReadingList.findByPk(req.params.id);

  if (!readingListItem) {
    throw new NotFoundError('Reading list item not found');
  }

  if (readingListItem.userId !== req.user.id) {
    throw new AuthorizationError('Permission denied');
  }

  if (typeof req.body.read !== 'boolean') {
    return res.status(400).json({ error: 'A boolean "read" status is required' });
  }

  readingListItem.read = req.body.read;
  await readingListItem.save();
  res.json(readingListItem);
});

module.exports = router;