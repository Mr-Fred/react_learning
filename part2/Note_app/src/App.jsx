import Note from "./components/Note"
import { useState, useEffect } from "react"

import noteService from './services/notes'



const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...') 
  const [showAll, setShowAll] = useState(true)

  // const hook = () => {
  //   axios
  //     .get('http://localhost:3001/notes')
  //     .then(response => {
  //       console.log('promise fulfilled')
  //       setNotes(response.data)
  //     })
  // }

  useEffect( 
    () => {
      noteService
        .getAll()
        .then(initialNotes  => {
          setNotes(initialNotes)
        })
    }
  , [])

  const notesToShow = showAll 
    ? notes 
    : notes.filter(note => note.important)

  const handleNoteChange = (event) => 
  {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  const addNote = (event) => {
      event.preventDefault()
      const noteObject = {
        content: newNote,
        important: Math.random() < 0.5
      }
      noteService
        .create(noteObject)
        .then(returnedNote => {
          setNotes(notes.concat(returnedNote))
          setNewNote('')
        })
  }
  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        alert(
          `Note '${note.content}' was already removed from server`
        )
        setNotes(notes.filter(n => n.id !== id))
        console.log(error)
      })
  }
  return (
    <div className="container flex flex-col items-center justify-center w-3/4 mx-auto my-10 p-6 rounded-lg shadow-md bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Notes</h1>
      <div className="note-list w-full text-center">
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-2 px-4 mb-3 rounded-full shadow-md transition duration-300"
          type="button" 
          onClick={() => setShowAll(!showAll)}
          >
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
          {notesToShow.map(note => 
              <Note 
              key={note.id} 
              note={note} 
              toggleImportance={
                () => {
                  toggleImportanceOf(note.id)
                }
              } />
          )}
      </ul>
      <form className="note-form flex gap-4 mt-6" onSubmit={addNote}>
          <input 
              className="p-2 border border-gray-400 rounded"
              type="text" 
              value={newNote}
              name="newNote"
              onChange={handleNoteChange}
          />
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">save</button>
      </form>
    </div>
  )
    
}
  
export default App