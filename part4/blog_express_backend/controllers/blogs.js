const router = require('express').Router();
const Blog = require('../models/Blog');

router.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { body } = req;

  try {
    const newBlog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    });

    const savedBlog = await newBlog.save();
    res.status(200).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  const { body } = req;

  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  try {
    const result = await Blog.findByIdAndUpdate(req.params.id, updatedBlog, {
      new: true,
      runValidators: true,
      context: 'query',
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// eslint-disable-next-line consistent-return
router.delete('/:id', async (req, res, next) => {
  try {
    const blogToDelete = Blog.findById(req.params.id);
    if (!blogToDelete) {
      return res.status(204).json({ error: 'Requested blog not found' });
    }
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).send('Blog deleted successfully!');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
