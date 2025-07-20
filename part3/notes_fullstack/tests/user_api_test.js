const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../models/User')
const { test, describe, after, beforeEach } = require('node:test')
const testHelpers = require('./test_helper')
const app = require('../app')
const supertest = require('supertest')
const assert = require('node:assert')

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret@', 10)
    const newUser = new User({ username: 'root', passwordHash })

    await newUser.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await testHelpers.usersInDb()
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await testHelpers.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await testHelpers.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen'
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await testHelpers.usersInDb()

    assert(result.body.error.includes('expected `username` to be unique'))
    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })
})

after( async () => {
  await mongoose.connection.close()
})
