const {test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Note = require('../models/note')
const testHelpers = require('../tests/test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Note.deleteMany({})

  for(let note of testHelpers.initialNotes) {
    let noteObject = new Note(note)
    await noteObject.save()
  }
})

test('Notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/notes')

  assert.strictEqual(response.body.length, testHelpers.initialNotes.length)
})

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes')
  const contents = response.body.map(r => r.content)
  assert(contents.includes('HTML is easy'))
})

test('a valid note can be added', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const notesAtEnd = await testHelpers.notesInDb()
  assert.strictEqual(notesAtEnd.length, testHelpers.initialNotes.length + 1)

  const contents = notesAtEnd.map(r => r.content)
  assert(contents.includes('async/await simplifies making async calls'))

})

test('a note without content is not added', async () => {
  const newNote = {
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)
  
  const notesAtEnd = await testHelpers.notesInDb()
  assert.strictEqual(notesAtEnd.length, testHelpers.initialNotes.length)
})

test('a specific note can be viewed', async () => {
  const noteAtStart = await testHelpers.notesInDb()
  const noteToView = noteAtStart[0]

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.deepStrictEqual(resultNote.body, noteToView)
})

test('a note can be deleted', async () => {
  const noteAtStart = await testHelpers.notesInDb()
  const noteToDelete = noteAtStart[0]

  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

  const notesAtEnd = await testHelpers.notesInDb()
  const contents = notesAtEnd.map(r => r.content)
  assert(!contents.includes(noteToDelete.content))

  assert.deepStrictEqual(notesAtEnd.length, testHelpers.initialNotes.length - 1)
})

after(async () => {
  await mongoose.connection.close()
})