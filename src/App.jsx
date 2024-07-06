import { useState, useEffect } from 'react'
// import axios from 'axios'
import Contacts from './components/Contacts'
import ContactForm from './components/ContactForm'
import Filter from './components/Filter'
import { areTheTwoObjEqual } from './lib/utilities'
import contactService from './lib/phonebook'


const App = () => {

  const [phonebook, setPhonebook] = useState([{
    id: '',
    name: '',
    number: ''
  }]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    contactService
    .getAllContacts()
    .then(
      contacts => {
        setPhonebook(contacts)
      }
    )
    .catch(error => {
      console.log(error)
    })
  }, [])


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    if(event.target.value)
      setSearchResults(
        phonebook.filter(
          person => person.name.toLowerCase().includes(event.target.value.toLowerCase())
      ) 
      )
    // else
    //   setSearchResults([])
  }

  const handleFormSubmission = (event) => {
    event.preventDefault()
    const phonebookObject = {
      name: newName,
      number: newNumber
    }
    // let's check if the new entry already exist
    const isEntryExist = phonebook.some(
      person => areTheTwoObjEqual(person, phonebookObject)
    )
    
    if(isEntryExist){
      alert(`${newName} is already in the phonebook`);
      return;
    } else {
      contactService
        .addNewContact(phonebookObject)
        .then(newContact => {
          setPhonebook(phonebook.concat(newContact))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log(error)
        })
    }

  }

  return (
    <div className='grid grid-rows-auto gap-3 w-3/4 mx-auto border-2 shadow-lg mt-5 text-center min-h-screen dark'>
      <h2 className="text-5xl my-5 font-bold uppercase tracking-wide bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text py-2">
      Phonebook
      </h2>
      <Filter 
        handleSearch={handleSearch}
        searchResults={searchResults}
      />
      <ContactForm 
        handleFormSubmission={handleFormSubmission}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <Contacts phonebook={phonebook} />
      <div>debug: {newName}</div>
    </div>
  )   
}

export default App