import Todo from './Todo'
import PropTypes from 'prop-types'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <>
      {(Array.isArray(todos) && todos.length > 0)
        ? todos.map(todo => (
          <Todo
            key={todo._id}
            todo={todo}
            deleteTodo={deleteTodo}
            completeTodo={completeTodo}
          />
        ))
        : <p>No todos available</p>
      }
    </>
  )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    })
  ).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
}

export default TodoList
