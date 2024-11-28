const {
  test, describe, after, beforeEach,
} = require('node:test');

const assert = require('node:assert');
const supertest = require('supertest');
const mongoose = require('mongoose');
const Blog = require('../models/Blog');
const { blogsInDb, initialBlogs } = require('../utils/api_test_helper');

const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

describe('api tests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('unique identifier is named id not _id', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .then((res) => {
        res.body.forEach((blog) => {
          assert(Object.keys(blog).includes('id'));
          assert(!Object.keys(blog).includes('_id'));
        });
      });
  });

  test('all blogs are returned', async () => {
    const blogs = initialBlogs;

    const response = await api.get('/api/blogs');
    assert.strictEqual(response.body.length, blogs.length);
  });

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'test blog',
      author: 'test author',
      url: 'test url',
      likes: 0,
    };

    const blogAtStart = initialBlogs;

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await blogsInDb();
    const ids = blogsAtEnd.map((b) => b.id);
    console.log(blogsAtEnd);

    assert.strictEqual(blogsAtEnd.length, blogAtStart.length + 1);
    assert(ids.includes(response.body.id));
  });

  test('a blog with missing title or author can\'t be added', async () => {
    const invalidBlog = {
      title: 'invalid blog',
      likes: 'invalid author',
    };

    await api
      .post('/api/blogs')
      .send(invalidBlog)
      .expect(400)
      .then((err) => {
        assert(err.body.error.includes('Blog validation failed'));
      });
  });

  test('a specific blog can be viewed', async () => {
    const blogAtStart = await blogsInDb();
    const blogToView = blogAtStart[0];

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.deepStrictEqual(resultBlog.body, blogToView);
  });

  test('a note can be deleted', async () => {
    const blogAtStart = await blogsInDb();
    const blogToDelete = blogAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const blogAtEnd = await blogsInDb();
    const titles = blogAtEnd.map((b) => b.title);
    assert(!titles.includes(blogToDelete.title));

    assert.deepStrictEqual(blogAtEnd.length, blogAtStart.length - 1);
  });

  test('a note can be updated', async () => {
    const blogsAtStart = await blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const updateData = {
      title: 'updated title',
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes,
    };

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updateData)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    // const blogsAtEnd = await blogsInDb();
    assert.strictEqual(updatedBlog.body.title, 'updated title');
  });

  test('if likes missing default to 0', async () => {
    const newBlog = {
      title: 'test',
      author: 'test author',
    };
    const res = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201);

    assert.strictEqual(res.body.likes, 0);
  });
});

after(async () => {
  await mongoose.connection.close();
});
