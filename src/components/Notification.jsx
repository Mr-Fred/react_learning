import propTypes from 'prop-types'



const Notification = ({message, type}) => {

  if (!message) {
    return null
  }

  return (
    <div className={type === 'error' ? 'text-red-500' : 'text-green-500'} >{message}</div>
  )
}

Notification.propTypes = {
  message: propTypes.string,
  type: propTypes.string.isRequired
}


export default Notification