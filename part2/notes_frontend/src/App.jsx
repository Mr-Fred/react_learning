import { useState, useEffect, useRef } from 'react'
// Services
import noteService from './services/notes'
import loginService from './services/login'

// Ui components
import Notification from './components/Notification'
import Footer from './components/Footer'
import { LoginForm, NoteForm } from './components/Forms'
import NotesList from './components/NoteList'
import Togglable from './components/Togglable'


const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null)
  const noteFormRef = useRef()

  useEffect(
    () => {
      noteService
        .getAll()
        .then(initialNotes  => {
          setNotes(initialNotes)
        })
    }
    , [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const createNote = async (noteObject) => {
    try {
      noteFormRef.current.toggleVisibility()
      const returnedNote = await noteService.create(noteObject)
      setNotes(notes.concat(returnedNote))
      setErrorMessage('a new note successfully added')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      // eslint-disable-next-line no-unused-vars
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }
  const loginApp = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      throw exception
    }
  }
  const logoutApp = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }
  return (
    <div className="container flex flex-col items-center justify-center w-3/4 mx-auto my-10 p-6 rounded-lg shadow-md bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Notes</h1>

      <Notification message={errorMessage} />
      {user === null ?
        <Togglable buttonLabel="login">
          <LoginForm
            loginApp={loginApp}
          />
        </Togglable>
        : <>
          <p>{user.username} logged-in</p> <button onClick={logoutApp}>logout</button>
          <br />
          <Togglable buttonLabel="new note" ref={noteFormRef}>
            <NoteForm
              createNote={createNote}
            />
          </Togglable>
        </>
      }
      <div className="note-list w-full text-center">
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-2 px-4 mb-3 rounded-full shadow-md transition duration-300"
          type="button"
          onClick={() => setShowAll(!showAll)}
        >
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <NotesList
        notes={notesToShow}
        toggleImportance={toggleImportanceOf}
      />
      <Footer />
    </div>
  )

}

export default App