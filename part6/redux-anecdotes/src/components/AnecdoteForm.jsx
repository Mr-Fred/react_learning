import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, clearNotification } from "../reducers/notificationReducer"

const NewAnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    dispatch(
      createAnecdote(anecdote)
    )
    event.target.anecdote.value = ''
    notify(`You created '${anecdote}'`, 'success')
  }
  const notify = (message, type) => {
    dispatch(setNotification({message, type}))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
  return (
    <form onSubmit={handleSubmit}>
      <input name='anecdote' />
      <button>create new</button>
    </form>
  )
}

export default NewAnecdoteForm