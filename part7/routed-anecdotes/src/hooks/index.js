import { useState } from "react";

export const useField = (name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  
  const reset = () => {
    setValue('')
  }

  return {
    name,
    value,
    onChange,
    reset,
    // Exclude `reset` when spreading into inputs
    inputProps: { name, value, onChange },
  }
}

export const useNotication = () => {
  const [message, setMessage] = useState(null)

  const show = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return {
    message,
    show
  }
}