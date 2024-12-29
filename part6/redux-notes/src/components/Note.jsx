import { useUpdateNote } from "../services/noteService"
import { showNotification } from "../reducers/notifReducer"
import { addUpdatedNote } from "../reducers/noteReducer"
import { useDispatch } from 'react-redux'
const Note = ({ note }) => {
  const dispatch = useDispatch()
  const { mutate: updateNote, isLoading, error } = useUpdateNote()


  const toggleImportance = async (n) => {
    const changedNote = { ...n, important: !n.important }
    updateNote(changedNote)
    dispatch(showNotification(`Note ${n.content} has been updated`, 'success', 5))
  }
  return(
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <button onClick={() => toggleImportance(note)}>
        <strong>
          {note.important ? 'Make Not important' : 'Make Important'}
        </strong>
      </button>
    </div>
  )
}

export default Note