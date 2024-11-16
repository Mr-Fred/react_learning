import propTypes from 'prop-types';

const Note = ({ note, toggleImportance }) => {
  const label = note.important
  ? "make not important"
  : "make important";
  return (
    <>
     <li className='p-2 font-bold rounded-md shadow-sm hover:bg-gray-100'>
      {note.content} ||    
      <button onClick={toggleImportance}>{label}</button>
    </li>
    </>
   
  )
}

Note.propTypes = {
  note: propTypes.objectOf(propTypes.shape({
    id: propTypes.number.isRequired,
    content: propTypes.string.isRequired,
    important: propTypes.bool.isRequired,
  })).isRequired,
  toggleImportance: propTypes.func.isRequired,
  // className: propTypes.string.isRequired
}

export default Note