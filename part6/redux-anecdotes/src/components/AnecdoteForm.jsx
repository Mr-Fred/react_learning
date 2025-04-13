import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { notify } from "../reducers/notificationReducer"


const NewAnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async(event) => {
    event.preventDefault()
    
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
  
    dispatch(createAnecdote(content))
    dispatch(notify(`You created '${content}'`, 'success', 10))
  }
  return (
    <form onSubmit={handleSubmit}>
      <input name='anecdote' />
      <button>create new</button>
    </form>
  )
}

export default NewAnecdoteForm