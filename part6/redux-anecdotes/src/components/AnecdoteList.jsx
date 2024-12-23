import { useSelector, useDispatch } from "react-redux";
import { PropTypes } from 'prop-types'
import { castVote } from '../reducers/anecdoteReducer'


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
  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
  const vote = (id) => {
    dispatch(castVote(id))
  }

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote.id)}
        />
      )}

    </div>
  )
}

export default AnecdotesList
