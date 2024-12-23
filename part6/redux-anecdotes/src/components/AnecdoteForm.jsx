import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"

const NewAnecdoteForm = () => {
  const dispatch = useDispatch()
  const handleSubmit = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    dispatch(
      createAnecdote(anecdote)
    )
    event.target.anecdote.value = ''
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name='anecdote' />
      <button>create new</button>
    </form>
  )
}

export default NewAnecdoteForm