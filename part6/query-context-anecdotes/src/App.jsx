import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useMutation, useQueryClient, useQuery} from '@tanstack/react-query'
import {update, getAll} from './requests'
import {useNotificationDispatch } from './notifHooks'

const App = () => {
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({
    mutationFn: update,
    onSuccess: (updateAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(
        a => a.id === updateAnecdote.id ? updateAnecdote : a
      ))
    }
  })
  const notificationDispatch = useNotificationDispatch()

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    notificationDispatch({
      type: 'VOTE',
      data: { message: `You voted for "${anecdote.content}"` }
    });
    setTimeout(() => notificationDispatch({
      type: 'CLEAR' }), 5000);
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    refetchOnWindowFocus: false,
    retry: 1
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }
  
  if (result.isError) {
    return <div>{`Error: ${result.error.message}`}</div>
  }

  const anecdotes = result.data
  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {sortedAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App
