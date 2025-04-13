import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'

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
      <h2>Notes</h2>
      <Filter />
      <Table striped>
        <tbody>
          {filteredNotes.map(note =>
            <tr key={note.id}>
              <td>
                <Link to={`/notes/${note.id}`}>
                  {note.content}
                </Link>
              </td>
              <td>
                {note.user}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Notes