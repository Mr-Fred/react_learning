import BlogForm from './components/NoteForm'
import Notes from './components/Notes'
import { useSelector } from 'react-redux'
import VisibilityFilter from './components/visibilityFilter'


const App = () => {
  const notes = useSelector(state => state)

  const filterSelected = (value) => {
    console.log(value)
  }

  return(
    <div>
      <BlogForm />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}
export default App;