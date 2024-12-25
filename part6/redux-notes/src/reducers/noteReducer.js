import { createSlice } from "@reduxjs/toolkit"
import noteService from '../services/notes'

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    addUpdatedNote: (state, action) => {
      const id = action.payload.id
      const changedNote = action.payload
      return state.map(note =>
        note.id !== id ? note : changedNote
      )
    },
    appendNote: (state, action) => {
      state.push(action.payload)
    },
    setNotes: (state, action) => {
      return action.payload
    }
  },
})
export const { setNotes, appendNote, addUpdatedNote } = noteSlice.actions

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}

export const createNote = content => {
  return async dispatch => {
    const newNote = await noteService.createNewNote(content)
    dispatch(appendNote(newNote))
  }
}
export const toggleImportance = (id) => {
  return async (dispatch, getState) => {
    const notes = getState().notes
    const noteToChange = notes.find(n => n.id === id)
    const changedNote = { ...noteToChange, important: !noteToChange.important }
    try {
      const changedNoteInServer = await noteService.update(id, changedNote)
      dispatch(addUpdatedNote(changedNoteInServer))
    } catch (error) {
      console.error('Failed to update note:', error)
    }
  }
}
export default noteSlice.reducer