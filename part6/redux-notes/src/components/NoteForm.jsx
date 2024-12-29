import { useCreateNewNote } from '../services/noteService'
import {useField} from '../hooks/index'
import { showNotification } from '../reducers/notifReducer'
import { useDispatch } from 'react-redux'

const NoteForm = () => {
  const { mutate: createNote, isLoading, error } = useCreateNewNote()
  const noteField = useField('text')
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = noteField.value
    event.target.note.value = ''
    if(error) {
      dispatch(showNotification('Error creating note', 'error'))
    } else if(isLoading) {
      dispatch(showNotification('Creating note...', 'pending'))
    } else {
      createNote(content)
    }
  }

  return (
    <form onSubmit={addNote}>
      <input { ...noteField } />
      <button type="submit">add</button>
    </form>
  )
}

export default NoteForm