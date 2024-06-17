import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'


const Button = ({ handleClick, text, className = '' }) => {
  
  return (
    <button 
      className={`border rounded-md px-4 py-2 ${text === 'good' ? 'bg-green-500' : text === 'neutral' ? 'bg-yellow-500' : 'bg-red-500'} ${className}`}
      onClick={handleClick}>
      {text}
    </button>
  )

}
const StatTable = ({data}) => {
  const theadStyle = "border border-slate-300 text-center p-2"
  const tbodyStyle = "border border-slate-300 text-center"

  return (
    <table className='border-collapse border border-slate-400 w-full'>
      <thead>
        <tr>
          <th className={theadStyle}>Feedback</th>
          <th className={theadStyle}>Number of feedback</th>
        </tr>
      </thead>
      <tbody>
        {data.map(stat =>
        <tr key={stat.text}>
          <td className={tbodyStyle}>{stat.text}</td>
          <td className={tbodyStyle}>{stat.value? stat.value : 0}</td>
        </tr>)}
      </tbody>
    </table>
  )
}

const Statistics = ({data, all}) => {

  const h1Style = "bg-slate-200 w-full text-center p-2 shadow-sm text-3xl font-bold"

  if (all === 0) {
    return (
      <>
        <h1 className={h1Style}>Statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <h1 className={h1Style}>Statistics</h1>
      <StatTable data={data}/>
    </>
  )
}

const Anecdotes = ({anecdotes, selected, setSelected}) => {
  const [voteReceived, setVoteRecieved] = useState(Array(anecdotes.length).fill(0))

  const data = anecdotes.map((text, index) => ({text, value: voteReceived[index]}))

  return(
    <div className='flex flex-col gap-3 items-center mx-auto'>
      <Button handleClick={
        () => {
          setSelected(Math.floor(Math.random() * anecdotes.length))
        }
      } 
      text='New Anecdocte'
      className='bg-blue-500 text-white font-bold text-2xl font-sans w-full'
      />
      <p className='text-center text-lg italic font-serif'>{anecdotes[selected]}</p>
      <div className='flex flex-row gap-3 items-center'>
        <Button handleClick={
          () => {
            const newVoteReceived = [...voteReceived]
            newVoteReceived[selected] += 1
            setVoteRecieved(newVoteReceived)
          }} 
          text='vote'
          className='bg-gray-400 text-white font-bold text-2xl font-sans'
        />
        <p className='text-center text-lg italic font-serif'>has {voteReceived[selected]} votes</p>
      </div>
      <MostVoted data={data}/>
    </div>
  )
}

const MostVoted = ({data}) => {

  // Find most voted anecdote
  const mostVoted = data.sort((a, b) => b.value - a.value)

  return (
    <div className='flex flex-col gap-3 items-center mx-auto border-2 border-slate-400 p-3 m-5'> 
    <h1 className='text-2xl font-bold bg-slate-200 w-full text-center p-2 shadow-sm'>Most voted Anecdote</h1>
    <p className='text-center text-lg italic font-serif'>{mostVoted[0].text}</p>
    <p className='text-center text-lg italic font-serif text-yellow-700'>has {mostVoted[0].value} votes</p>
    </div>
  )
}

MostVoted.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  })).isRequired
}

Anecdotes.propTypes = {
  anecdotes: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.number.isRequired,
  setSelected: PropTypes.func.isRequired,
}

Statistics.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ).isRequired,
  all: PropTypes.number.isRequired
}

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string
}

StatTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ).isRequired
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [selected, setSelected] = useState(0)

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  useEffect(() => {
    setAll(good + neutral + bad)
    setAverage((good - bad) / all)
    setPercentage((good / all) * 100)
  }, [good, neutral, bad, all])


  return (
    <main className='flex items-center justify-center item-center flex-col gap-5 max-w-md m-5 mx-auto'>
      <Anecdotes 
      anecdotes={anecdotes} 
      selected={selected} 
      setSelected={setSelected}
      />
      <h1 className='text-1xl font-bold mt-5'>GIVE FEEDBACK</h1>
      <div className='flex flex-row gap-3 mb-5'>
        <Button handleClick={
          () => setGood(good + 1)
          } 
          text='good'
        />
        <Button handleClick={
          () => setNeutral(neutral + 1)
          } 
          text='neutral'
        />
        <Button handleClick={
          () => setBad(bad + 1)
          } 
          text='bad'
        />
      </div>
      <Statistics data={[
        {text: 'good', value: good},
        {text: 'neutral', value: neutral},
        {text: 'bad', value: bad},
        {text: 'all', value: all },
        {text: 'average', value: average},
        {text: 'percentage', value: percentage}
      ]} all={all}/>

    </main>
  )
}

export default App