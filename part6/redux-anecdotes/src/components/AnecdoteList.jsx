import { useSelector, useDispatch } from "react-redux";
import { PropTypes } from 'prop-types'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { notify } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

Anecdote.propTypes = {
  anecdote: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
}

const AnecdotesList = () => {

  const anecdotes = useSelector(({filter, anecdotes}) => {
    if (filter === '') {
      return anecdotes
    }
    return anecdotes.filter(
      anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
  })

  const dispatch = useDispatch()
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  
  const handleClick = (anecdote) => {
    dispatch(voteForAnecdote(anecdote.id))
    dispatch(notify(`You voted for '${anecdote.content}'`, 'success', 5))
  }
  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleClick(anecdote)}
        />
      )}
    </div>
  )
}

export default AnecdotesList
