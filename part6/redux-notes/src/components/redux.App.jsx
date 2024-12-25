import { useEffect } from 'react'
import NoteForm from './NoteForm'
import Notes from './Notes'
import VisibilityFilter from './visibilityFilter'

import {useDispatch} from 'react-redux'
import { initializeNotes } from '../reducers/noteReducer'


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