// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
function UsernameForm({onSubmitUsername}) {
  const inputRef = React.useRef(null)
  const [username, setUsername] = React.useState(null)
  // const [error, setError] = React.useState(null)
  // 🐨 add a submit event handler here (`handleSubmit`).
  function handleSubmit(event){
    event.preventDefault()
    onSubmitUsername(username)
  }
  
  function handleChange(event) {
    const value = event.target.value
    // const isValid = value === value.toLowerCase()
    // setError(isValid ? null : 'Username must be lower case')
    setUsername(value.toLowerCase())
  }
  // 💰 Make sure to accept the `event` as an argument and call
  // `event.preventDefault()` to prevent the default behavior of form submit
  // events (which refreshes the page).
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
  //
  // 🐨 get the value from the username input (using whichever method
  // you prefer from the options mentioned in the instructions)
  // 💰 For example: event.target.elements[0].value
  // 🐨 Call `onSubmitUsername` with the value of the input

  // 🐨 add the onSubmit handler to the <form> below

  // 🐨 make sure to associate the label to the input.
  // to do so, set the value of 'htmlFor' prop of the label to the id of input
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='username'>Username:</label>
        <input value={username} onChange={handleChange} id='username' type="text" ref={inputRef}/>
      </div>
      {/* <p role='alert' style={{color: 'red'}}>{error}</p> */}
      <button type="submit">Submit</button>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}

export default App
