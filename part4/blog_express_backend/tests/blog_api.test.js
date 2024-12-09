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

describe('api tests', () => {
  let token;
  let blogs;

  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(initialBlogs);
    const response = await api
      .post('/api/login')
      .send({ username: 'johndoe123', password: 'hashedpassword1' })
      .expect(200);
    token = response.body.token;
  });

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('unique identifier is named id not _id', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .set('Authorization', `Bearer ${token}`)
      .then((res) => {
        res.body.forEach((blog) => {
          assert(Object.keys(blog).includes('id'));
          assert(!Object.keys(blog).includes('_id'));
        });
      });
  });

  test('all blogs are returned', async () => {
    blogs = await blogsInDb();

    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(response.body.length, blogs.length);
  });

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'test blog',
      author: 'test author',
      url: 'test url',
      likes: 0,
    };
    blogs = await blogsInDb();
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await blogsInDb();
    const ids = blogsAtEnd.map((b) => b.id);

    assert.strictEqual(blogsAtEnd.length, blogs.length + 1);
    assert(ids.includes(response.body.id));
  });

  test('a blog with missing title or author can\'t be added', async () => {
    const invalidBlog = {
      title: 'invalid blog',
      likes: 'invalid author',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(invalidBlog)
      .expect(400)
      .then((err) => {
        assert(err.body.error.includes('Blog validation failed'));
      });
  });

  test('a specific blog can be viewed', async () => {
    const blogAtStart = await blogsInDb();
    const blogToView = blogAtStart[0];

    const result = await api
      .get(`/api/blogs/${blogToView.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.deepEqual(result.body.id, blogToView.id);
    // assert.deepEqual(result.body.title, blogToView.title);
    // assert.deepEqual(result.body.author, blogToView.author);
  });

  test('a blog can be deleted', async () => {
    blogs = await blogsInDb();
    const blogToDelete = blogs[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const blogAtEnd = await blogsInDb();
    const titles = blogAtEnd.map((b) => b.title);
    assert(!(titles.includes(blogToDelete.title)));

    assert.deepStrictEqual(blogAtEnd.length, blogs.length - 1);
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
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201);

    assert.strictEqual(res.body.likes, 0);
  });
});

after(async () => {
  await mongoose.connection.close();
});
