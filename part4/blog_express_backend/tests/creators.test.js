const {
  describe, test, after, beforeEach,
} = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const helpers = require('../utils/api_test_helper');
const Creator = require('../models/Creator');
const app = require('../app');

const api = supertest(app);

describe('Creators can be added', () => {
  beforeEach(async () => {
    await Creator.deleteMany({});
    await helpers.populateCreatorsDb(helpers.initialCreators);
  });

  test('a valid creator can be added', async () => {
    const demoCreator = {
      name: 'demo creator',
      username: 'demo_creator',
      password: 'demopassword',
    };

    const creatorsAtStart = await helpers.creatorsInDb();

    const response = await api
      .post('/api/creators')
      .send(demoCreator)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const creatorsAtEnd = await helpers.creatorsInDb();

    const creator = response.body;
    assert.ok(creator.id);
    assert.strictEqual(creator.name, demoCreator.name);
    assert.strictEqual(creator.username, demoCreator.username);

    assert.strictEqual(creatorsAtEnd.length, creatorsAtStart.length + 1);
  });

  test('an invalid creator(missing username) cannot be added ', async () => {
    const invalidCreator = {
      name: 'demo creator',
      password: 'demo1234',
    };
    const creatorsAtStart = await helpers.creatorsInDb();

    const response = await api
      .post('/api/creators')
      .send(invalidCreator)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const creatorsAtEnd = await helpers.creatorsInDb();
    assert(response.body.error.includes('Creator validation failed'));
    assert.strictEqual(creatorsAtEnd.length, creatorsAtStart.length);
  });

  test('password too short (<8) cannot be added', async () => {
    const invalidCreator = {
      name: 'demo creator',
      username: 'demo_creator',
      password: 'demo12',
    };
    const creatorsAtStart = await helpers.creatorsInDb();

    const response = await api
      .post('/api/creators')
      .send(invalidCreator)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const creatorsAtEnd = await helpers.creatorsInDb();

    assert(response.body.error.includes('password must be at least 8 characters long'));
    assert.strictEqual(creatorsAtEnd.length, creatorsAtStart.length);
  });

  test('duplicate username cannot be added', async () => {
    const duplicateCreator = {
      name: 'duplicate creator',
      username: 'johndoe123',
      password: 'hashedpassword1',
    };
    const creatorsAtStart = await helpers.creatorsInDb();

    const response = await api
      .post('/api/creators')
      .send(duplicateCreator)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const creatorsAtEnd = await helpers.creatorsInDb();

    assert(response.body.error.includes('expected `username` to be unique'));
    assert.strictEqual(creatorsAtEnd.length, creatorsAtStart.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
