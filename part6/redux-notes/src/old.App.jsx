import { useEffect } from 'react'
import NoteForm from './components/NoteForm'
import Notes from './components/Notes'
import VisibilityFilter from './components/visibilityFilter'

import {useDispatch} from 'react-redux'
import { initializeNotes } from './reducers/noteReducer'


const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeNotes())
  }, [])
  
  return(
    <div>
      <NoteForm />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}
export default App;