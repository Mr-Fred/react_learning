import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendNewAnecdote: (state, action) => {
      state.push(action.payload)
    },
    addUpdatedAnecdote: (state, action) => {
      const id = action.payload.id
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : action.payload
      )
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const { appendNewAnecdote, addUpdatedAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    try {
      const anecdotes = await anecdoteService.getAll()
      dispatch(setAnecdotes(anecdotes))
    } catch (error) {
      console.error('Failed to fetch anecdotes:', error)
    }
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    try {
      const newAnecdote = await anecdoteService.createNew(content)
      dispatch(appendNewAnecdote(newAnecdote))
    } catch (error) {
      console.error('Failed to create anecdote:', error)
    }
  }
}

export const voteForAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes
    const anecdoteToChange = anecdotes.find(a => a.id === id)
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    }
    try {
      const updatedAnecdote = await anecdoteService.update(id, changedAnecdote)
      dispatch(addUpdatedAnecdote(updatedAnecdote))
    } catch (error) {
      console.error('Failed to update anecdote:', error)
    }
  }
}

export default anecdoteSlice.reducer