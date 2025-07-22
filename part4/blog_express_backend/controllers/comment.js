const commentRouter = require('express').Router({ mergeParams: true });
const Comment = require('../models/Comment');
const { validateToken, validateBlog } = require('../utils/middleware');

commentRouter.get('/', async (req, res) => {
  try {
    validateToken(req.token, res);
    const blogId = req.params.id;
    const comments = await Comment
      .find({ blog: blogId })
      .populate('blog', { id: 1 });
    res.json(comments);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

commentRouter.post('/', async (req, res) => {
  try {
    validateToken(req.token, res);

    const { content } = req.body;
    const blogId = req.params.id;

    await validateBlog(blogId, res);

    const newComment = new Comment({
      content,
      blog: blogId,
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

commentRouter.put('/', async (req, res) => {
  try {
    validateToken(req.token, res);

    const { content, id } = req.body;
    const blogId = req.params.id;

    await validateBlog(blogId, res);

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { blog: blogId, content },
      { new: true, runValidators: true },
    ).populate('blog', { id: 1 });

    if (!updatedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.json(updatedComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

commentRouter.delete('/', async (req, res) => {
  try {
    validateToken(req.token, res);
    const { commentId, id: blogId } = req.params;

    await validateBlog(blogId, res);

    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.status(200).json(deletedComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = commentRouter;
