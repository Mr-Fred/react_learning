import propTypes from 'prop-types'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: propTypes.string
}

export default Notification