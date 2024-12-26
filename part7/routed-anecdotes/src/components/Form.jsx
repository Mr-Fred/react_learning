import { useNavigate } from "react-router-dom"
import { PropTypes } from 'prop-types'
import { useField, useNotication } from "../hooks"

const CreateNew = (props) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')
  const notification = useNotication()

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
    notification.show(`a new anecdote ${content} created!`)
  }

  const resetFields = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.inputProps} />
        </div>
        <div>
          author
          <input {...author.inputProps} />
        </div>
        <div>
          url for more info
          <input {...info.inputProps} />
        </div>
        <button>create</button>
        <button type="button" onClick={resetFields}>reset</button>
      </form>
    </div>
  )

}
CreateNew.propTypes = {
  addNew: PropTypes.func.isRequired,
}

export default CreateNew