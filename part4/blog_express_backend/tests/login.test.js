const {
  describe, test, after, beforeEach,
} = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const mongoose = require('mongoose');
const helpers = require('../utils/api_test_helper');
const Creator = require('../models/Creator');
const app = require('../app');

const api = supertest(app);

describe('login tests', () => {
  test('creator can login with correct username and password ', async () => {
    const user = {
      username: 'johndoe123',
      password: 'hashedpassword1',
    };
    const res = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    assert(res.body.token);
  });

  test('creator cannot login with incorrect username and password', async () => {
    const user = {
      username: 'johndoe123',
      password: 'wrongpassword',
    };
    await api
      .post('/api/login')
      .send(user)
      .expect(401)
      .then((err) => {
        assert(err.body.error.includes('Invalid username or password'));
      });
  });
});

after(async () => {
  await mongoose.connection.close();
});
