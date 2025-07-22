
const Notifier = ({errorMessage}) => {
  if (errorMessage === null) {
    return null
  }

  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

export default Notifier