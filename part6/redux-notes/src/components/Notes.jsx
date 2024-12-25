import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getNotes, updateNote } from '../services/requests'
import { useSelector } from 'react-redux'

import Filter from './FilterButtons'


const Note = ({ note }) => {
  const queryClient = useQueryClient()

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries(['notes'])
    }
  })
    
  const toggleImportance = (note) => {
    updateNoteMutation.mutate({ ...note, important: !note.important })
  }
  return(
    <li onClick={() => toggleImportance(note)}>
      {note.content} 
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  )
}

const Notes = () => {

  const filter = useSelector(({ filter}) => {return filter})

  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    refetchOnWindowFocus: false
  })
  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  if ( result.isError ) {
    return <div>error loading data</div>
  }
  const notes = result.data

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
          <Note
            key={note.id}
            note={note}
          />
        )}
      </ul>
    </div>
  )
}

export default Notes