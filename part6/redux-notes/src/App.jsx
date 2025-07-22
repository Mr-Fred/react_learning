import Notes from './components/NoteList'
import Login from './components/Login'
import Users from './components/Users'
import Home from './components/Home'
import Note from './components/Note'
import Notification from './components/Notification'
import { useGetAllNotes } from './services/noteService'
import { useSelector } from 'react-redux'
import { showNotification } from './reducers/notifReducer'
import { useDispatch } from 'react-redux'

import { Navbar, Nav } from 'react-bootstrap'

import { 
  Routes,
  Route,
  Link,
  Navigate,
  useMatch
} from 'react-router-dom'

const App = () => {

  const { data: notes, isLoading, error } = useGetAllNotes(BACKEND_URL)
  const {user, isLoggedIn, loginError} = useSelector(({ login }) => login)
  const dispatch = useDispatch()
  const match = useMatch('/notes/:id')

  const padding = {
    padding: 5
  }

  if ( isLoading ) {
    return <div>loading data...</div>
  }
  if ( error) {
    return <div>error loading data</div>
  }

  if (loginError) {
    dispatch(showNotification(loginError, 'error'))
  }

  const note = match
  ? notes.find(note =>  Number(note.id) === Number(match.params.id))
  : null

  return(
    <div className='container'>
      <Notification />
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">home</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/notes">notes</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user
                ? <em style={padding}>{user.name} logged in</em>
                : <Link style={padding} to="/login">login</Link>
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route path="/notes" element={<Notes notes={notes}/>} />
        <Route path="/users" element={isLoggedIn ? <Users /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
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