import PropTypes from 'prop-types'
import { useState } from 'react'


const LoginForm = ({loginApp}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    loginApp(username, password)
  }

  return(
    <div className="max-w-md mx-auto bg-white p-6 mb-5 rounded-lg shadow-md">
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">username</label>
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({target}) => setUsername(target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">password</label>
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({target}) => setPassword(target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition">
            Login
          </button>
        </form>
    </div>
  )
}

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')
  
  const addNote = (event) => {
    event.preventDefault();
    createNote({
      content: newNote,
      important: Math.random() < 0.5,
    })
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 my-5 rounded-lg shadow-md">
      <h2>Create a new note</h2>
      <form className="flex items-center gap-4" onSubmit={addNote}>
        <input
          type="text"
          value={newNote}
          name="newNote"
          onChange={handleNoteChange}
          className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          placeholder="Write a new note..."
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition"
        >
          Save
        </button>
      </form>
  </div>
  )
};

LoginForm.propTypes = {
  loginApp: PropTypes.func.isRequired,
}

NoteForm.propTypes = {
  createNote: PropTypes.func.isRequired,
}

export {LoginForm, NoteForm}
