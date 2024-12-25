import { useQueryClient, useMutation } from '@tanstack/react-query'
import { updateNote } from '../services/requests'

const Note = ({ note }) => {

  const queryClient = useQueryClient()

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries(['notes'])
    }
  })
    
  const toggleImportance = (n) => {
    updateNoteMutation.mutate({ ...n, important: !n.important })
  }
  return(
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div onClick={() => toggleImportance(note)}><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}

export default Note