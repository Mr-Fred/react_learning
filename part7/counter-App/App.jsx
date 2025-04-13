import useCounter from './hooks/useCounter'
import Form from './components/Form'

const App = () => {
  const counter = useCounter()

  return (
    <div>
      <div>{counter.value}</div>
      <button onClick={counter.increase}>
        plus
      </button>
      <button onClick={counter.decrease}>
        minus
      </button>      
      <button onClick={ counter.zero }>
        zero
      </button>
      <Form />
    </div>
  )
}


export default App