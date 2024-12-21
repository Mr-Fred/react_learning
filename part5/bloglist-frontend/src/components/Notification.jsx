import React from 'react'

const Notification = ({ notification }) => {
  const { message, type } = notification

  if (message === null) {
    return null
  }
  const notificationStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  }

  if (type === 'error') {
    notificationStyle.color = 'red'
  } else {
    notificationStyle.color = 'green'
  }

  return (
    <div style={notificationStyle} className='notification'>
      {message}
    </div>
  )
}

export default Notification
