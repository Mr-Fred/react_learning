import { createSlice } from "@reduxjs/toolkit"
import {useGetAllNotes, useCreateNewNote, useUpdateNote, useDeleteNote} from '../services/noteService'

const initialState = {
  notes: [],
  isLoading: false,
  error: null
}

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action) => {
      return state.notes = action.payload
    },
    addNewNote: (state, action) => {
      state.notes.push(action.payload)
    },
    addUpdatedNote: (state, action) => {
      const id = action.payload.id
      const changedNote = action.payload
      return state.notes.map(note =>
        note.id !== id ? note : changedNote
      )
    },
    removeNote: (state, action) => {
      const id = action.payload
      return state.notes.filter(note => note.id !== id)
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
})
export const { setNotes, addNewNote, addUpdatedNote, removeNote, setIsLoading, setError } = noteSlice.actions

// export const initializeNotes = () => {
//   return async dispatch => {
//     const {data: notes, isloading, error} = await useGetAllNotes()
//     if(isloading) {
//       dispatch(setIsLoading(isloading))
//     }
//     if(error) {
//       dispatch(setError(error))
//     }
//     dispatch(setNotes(notes))
//   }
// }

// export const createNote = content => {
//   return async dispatch => {
//     const {mutate: createNote, isLoading, error} = await useCreateNewNote()
//     const newNote = await createNote({ content, important: false })
//     if(isLoading) {
//       dispatch(setIsLoading(isLoading))
//     }
//     if(error) {
//       dispatch(setError(error))
//     }
//     dispatch(addNewNote(newNote))
//   }
// }
// export const toggleImportanceOf = (id) => {
//   return async (dispatch, getState) => {
//     const notes = getState().notes
//     const noteToChange = notes.find(n => n.id === id)
//     const changedNote = { ...noteToChange, important: !noteToChange.important }

//     const {mutate: updateNote, isLoading, error} = await useUpdateNote()
//     const changedNoteInServer = await updateNote(id, changedNote)
//     if(isLoading) {
//       dispatch(setIsLoading(isLoading))
//     }
//     if(error) {
//       dispatch(setError(error))
//     }
//     dispatch(addUpdatedNote(changedNoteInServer))
//   }
// }
export default noteSlice.reducer