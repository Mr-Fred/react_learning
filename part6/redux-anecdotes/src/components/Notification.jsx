import { useSelector } from 'react-redux'

const Notification = () => {

  const {message, type} = useSelector(({notification}) => {
    return notification
  })
  if (message === null) {
    return null
  }
  const color = type === 'error' ? 'red' : 'green'
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    color: color
  }
  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification