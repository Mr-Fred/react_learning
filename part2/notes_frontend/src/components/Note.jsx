import propTypes from 'prop-types';

const Note = ({ note, toggleImportance }) => {
  const label = note.important
  ? "make not important"
  : "make important";
  return (
    <>
     <li className="p-4 m-3 bg-gray-100 rounded-md shadow-md flex justify-between items-center hover:bg-gray-200 transition">
      <span className="text-gray-800 font-medium">{note.content}</span>
      <button
        onClick={toggleImportance}
        className="text-blue-500 underline hover:text-blue-700"
      >
        {label}
      </button>
    </li>
    </>
  )
}

Note.propTypes = {
  note: propTypes.shape({
    id: propTypes.string.isRequired,
    content: propTypes.string.isRequired,
    important: propTypes.bool.isRequired,
  }).isRequired,
  toggleImportance: propTypes.func.isRequired,
  // className: propTypes.string.isRequired
}

export default Note