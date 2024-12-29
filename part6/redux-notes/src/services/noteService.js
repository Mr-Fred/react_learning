import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { showNotification } from '../reducers/notifReducer';
import { useDispatch } from 'react-redux';

export const useGetAllNotes = (url) => {
  const baseUrl = url || 'http://localhost:3001/notes'
  return useQuery({
    queryKey: ['notes'],
    queryFn: async () => {
      const response = await axios.get(baseUrl)
      return response.data
    },
    refetchOnWindowFocus: false
  })
}

export const useCreateNewNote = (url) => {
  const baseUrl = url || 'http://localhost:3001/notes'
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  return useMutation({
    mutationFn: async content => {
      const response = await axios.post(baseUrl, { content, important: false })
      return response.data
    },
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData(['notes'])
      queryClient.setQueryData(['notes'], notes.concat(newNote))
      dispatch(showNotification(`Note ${newNote.content} has been created`, 'success', 5))
    },
    onError: () => {
      dispatch(showNotification('Error creating note', 'error', 10))
    } 
  })
}

export const useUpdateNote = (url) => {
  const baseUrl = url || 'http://localhost:3001/notes'
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newObject) => {
      const id = newObject.id
      const response = await axios.put(`${baseUrl}/${id}`, newObject)
      return response.data
    },
    onSuccess: async (newObject) => {
      const notes = queryClient.getQueryData(['notes'])
      queryClient.setQueryData(['notes'], notes.map(note => note.id !== newObject.id ? note : newObject))
    }
  })
}

export const useDeleteNote = (url) => {
  const baseUrl = url || 'http://localhost:3001/notes'
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${baseUrl}/${id}`)
    },
    onMutate: async () => {
      const notes = queryClient.getQueryData(['notes'])
      queryClient.setQueryData(['notes'], notes.filter(note => note.id !== id))
    }
  })
}
  