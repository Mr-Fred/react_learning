import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR} from '../lib/queries'


const EditAuthorForm = ({name, born, setBorn, setName}) => {

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    editAuthor({
      variables: { name: name, setBornTo: parseInt(born) }
    })
    setBorn('')
    setName('')
  }

  if(name === ''){
    return null
  }
  
  return (
    <div>
      <h2>Set Birth Year</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name"></label>
        <input
          id='name'
          type="text"
          value={name}
          readOnly
        />
        <label htmlFor="born"></label>
        <input 
          id='born'
          type="number"
          value={born}
          onChange={({ target }) => setBorn(target.value)}
        />
        <button type="submit">update author</button>
      </form>

    </div>
  )
}


EditAuthorForm.propTypes = {
  name: PropTypes.string,
  born: PropTypes.string,
  setBorn: PropTypes.func,
  setName: PropTypes.func
}

export default EditAuthorForm
