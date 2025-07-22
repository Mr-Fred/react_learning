import {useMutation, useQueryClient} from '@tanstack/react-query'
import {createNew} from '../requests'
import {useNotificationDispatch} from '../notifHooks'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      notificationDispatch({
        type: 'SUCCESS', 
        data: { message: `You created "${newAnecdote}"` }
      });
      setTimeout(() => notificationDispatch({
        type: 'CLEAR'
        }), 5000);
    },
    onError: (error) => {
      console.log(error)
      notificationDispatch({
        type: 'ERROR',
        data: { message: `Error: ${error.response.data.error}` }
      });
      setTimeout(() => notificationDispatch({
        type: 'CLEAR'
        }), 5000);
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
