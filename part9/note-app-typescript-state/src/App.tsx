import { useState, useEffect } from 'react';
import { getAllNotes, createNote } from './services';
import { Note } from './types';

const App = () => {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', content: 'testing' }
  ]);

  useEffect(() => {
    getAllNotes()
      .then(initialNotes => {
        setNotes(initialNotes);
      })
      .catch(error => {
        console.error('Error fetching notes:', error);
      });
  }, []);

  const addNote = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
    };
    createNote(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      }
      )
      .catch(error => {
        console.error('Error creating note:', error);
      });
  };

  return (
    <div>
      <h1>Notes</h1>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button type="submit">save</button>
      </form>
      <ul>
        {notes.map(note => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  )
};

export default App;