import { useQuery } from 'react-query'
import { getNotes } from '../services/notes'
import { login } from '../services/login'

import Notes from './components/NoteList'
import Login from './components/Login'
import Users from './components/Users'
import Home from './components/Home'
import Note from './components/Note'

import { 
  Routes,
  Route,
  Link,
  Navigate,
  useMatch
} from 'react-router-dom'

const App = () => {

  const padding = {
    padding: 5
  }
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

  const match = useMatch('/notes/:id')
  const note = match
  ? notes.find(note => note.id === Number(match.params.id))
  : null

  return(
    <div>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link>
        {user      
          ? <em>{user} logged in</em>      
          : <Link style={padding} to="/login">login</Link>    }
      </div>

      <Routes>
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route path="/notes" element={<Notes notes={notes}/>} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <footer>
        <br />
        <em>Note app, Department of Computer Science 2024</em>
      </footer>
    </div>
  )
}

export default App