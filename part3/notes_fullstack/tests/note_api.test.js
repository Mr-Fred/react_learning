const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Note = require('../models/Note')
const User = require('../models/User')
const testHelpers = require('./test_helper')

const api = supertest(app)

describe('when there is initially some notes saved', () => {
  let token

  beforeEach(async () => {
    await Note.deleteMany({})
    await User.deleteMany({})

    // Create a user and log in to get a token
    const user = {
      username: 'testuser',
      name: 'Test User',
      password: 'password'
    }
    const createdUserResponse = await api.post('/api/users').send(user)
    const createdUser = createdUserResponse.body

    const loginRes = await api.post('/api/login').send({ username: user.username, password: user.password })
    token = loginRes.body.token

    // Create initial notes for this user
    const notesWithUser = testHelpers.initialNotes.map(note => ({ ...note, user: createdUser.id }))
    await Note.insertMany(notesWithUser)
  })

  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')
    assert.strictEqual(response.body.length, testHelpers.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(r => r.content)
    assert(contents.includes('Browser can execute only JavaScript'))
  })


  describe('Viewing a specific note', () => {
    test('the first note is about HTTP methods', async () => {
      const response = await api.get('/api/notes')
      const contents = response.body.map(r => r.content)
      assert(contents.includes('HTML is easy'))
    })

    test('a specific note can be viewed', async () => {
      const noteAtStart = await testHelpers.notesInDb()
      const noteToView = noteAtStart[0]

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      // The user property in noteToView is an ObjectId, while in the API response it's a string.
      // JSON.stringify converts the ObjectId to a string, making the comparison pass.
      assert.deepStrictEqual(resultNote.body, JSON.parse(JSON.stringify(noteToView)))
    })

    test('fails with statuscode 404 if note does not exist', async () => {
      const validNonexistingId = await testHelpers.nonExistingId()

      await api
        .get(`/api/notes/${validNonexistingId}`)
        .expect(404)
    })


    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/notes/${invalidId}`)
        .expect(400)
    })
  })

  describe('addition of a new note', () => {
    test('succeeds with valid data', async () => {
      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
      }

      await api
        .post('/api/notes')
        .set('Authorization', `Bearer ${token}`)
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const notesAtEnd = await testHelpers.notesInDb()
      assert.strictEqual(notesAtEnd.length, testHelpers.initialNotes.length + 1)

      const contents = notesAtEnd.map(n => n.content)
      assert(contents.includes('async/await simplifies making async calls'))
    })

    test('fails with status 401 if token is missing', async () => {
      const newNote = {
        content: 'this note will not be saved',
        important: true,
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(401)
    })

    test('fails with status code 400 if data invalid', async () => {
      const newNote = {
        important: true
      }

      await api
        .post('/api/notes')
        .set('Authorization', `Bearer ${token}`)
        .send(newNote)
        .expect(400)

      const notesAtEnd = await testHelpers.notesInDb()

      assert.strictEqual(notesAtEnd.length, testHelpers.initialNotes.length)
    })
  })

  describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const noteAtStart = await testHelpers.notesInDb()
      const noteToDelete = noteAtStart[0]

      await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const notesAtEnd = await testHelpers.notesInDb()
      const contents = notesAtEnd.map(r => r.content)
      assert(!contents.includes(noteToDelete.content))

      assert.strictEqual(notesAtEnd.length, testHelpers.initialNotes.length - 1)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
