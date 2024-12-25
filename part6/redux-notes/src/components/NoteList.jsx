import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Filter from './FilterButtons'

const Notes = ({notes}) => {

  const filter = useSelector(({ filter}) => {return filter})

  const filterNotes = () => {
    if (filter === 'ALL') {
      return notes
    }
    return filter === 'IMPORTANT'
      ? notes.filter(note => note.important)
      : notes.filter(note => !note.important) 
  }
  const filteredNotes = filterNotes()

  return(
    <div>
      <Filter />
      <ul>
        {filteredNotes.map(note =>
          <li>
            <Link to={`/notes/${note.id}`}>{note.content}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Notes