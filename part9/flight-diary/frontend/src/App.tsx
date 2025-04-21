import { useState, useEffect } from 'react'
import { Diary } from './types'
import { getAllDairies, createDiary } from './services/dairies.service'

import NewDiaryForm from './components/NewDiaryForm'
import DiariesList from './components/DiariesList'
import Notification from './components/Notification'

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [newDiary, setNewDiary] = useState<Diary>({} as Diary)
  const [notification, setNotification] = useState<string | null>(null)

  useEffect(() => {
    getAllDairies()
      .then((response) => {
        setDiaries(response)
      })
      .catch((error) => {
        console.error('Error fetching diaries:', error)
        setNotification('Error fetching diaries')
        setTimeout(() => {
          setNotification(null)
        }
        , 5000)
      })
  }, [])

  useEffect(() => {
    if (newDiary) {
      setDiaries((prevDiaries) => [...prevDiaries, newDiary])
    }
  }, [newDiary])
  return (
    <>
      <h1>Flight Diary</h1>

      <Notification message={notification} type="error" />

      <h2>Add a new diary entry</h2>
      <p>Fill in the form below to add a new diary entry.</p>
      <p>Make sure to fill in all fields correctly.</p>
      <p>Click the "Add Diary" button to submit your entry.</p>
      
      <NewDiaryForm 
        createDiary={createDiary} 
        setNewDiary={setNewDiary} 
      />
      <DiariesList diaries={diaries} />
    </>
  )
}

export default App
