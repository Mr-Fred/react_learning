import React from 'react'
import propTypes from 'prop-types';

const Note = ({ note }) => {
  return (
    <li className='p-2 rounded-md shadow-sm hover:bg-gray-100'>{note.content}</li>  
  )
}

Note.propTypes = {
  note: propTypes.objectOf(propTypes.shape({
    id: propTypes.number.isRequired,
    content: propTypes.string.isRequired,
    important: propTypes.bool.isRequired,
  })).isRequired,
  // className: propTypes.string.isRequired
}

export default Note