import { useState } from 'react'
import Contacts from './components/Contacts'
import ContactForm from './components/ContactForm'
import Filter from './components/Filter'


function areTheTwoObjEqual(obj1, obj2) {
  'use strict'
  
  // verify if obj are empty and if either variable is empty
  // we can instantly compare them and check for equality.
  if (Object.keys(obj1).length === 0 && Object.keys(obj2).length === 0) {
    return true
  }
  // Check if obj constructors are equal. If true both obj must be of same type.
  if (obj1.constructor !== obj2.constructor) {
    return false
  }
  //check what type one of the objects is, and then compare them
  if (obj1 instanceof Function || obj1 instanceof RegExp) {
    return obj1 === obj2
  }
  // in we are dealing with simple object, let's simple comparison
  if(obj1 === obj2 || obj1.valueOf() === obj2.valueOf()){
    return true
  } 
  // If the value of check we saw above failed and the objects are Dates,
  // we know they are not Dates because Dates would have equal valueOf() values
  if ( obj1 instanceof Date) return false

  // If the objects are arrays, they are not equal if they have not equal lengths
  if(Array.isArray(obj1) && obj1.length !== obj2.length){
    return false
  }
  // If we have gotten to this point, we need to just make sure that we are
  // working with objects so that we can do a recursive check of the keys and values.
  if (!(obj1 instanceof Object) || !(obj2 instanceof Object)) {
    // Handle non-object comparison (convert to lowercase if they are strings)
    if (typeof obj1 === 'string' && typeof obj2 === 'string') {
      return obj1.toLowerCase() === obj2.toLowerCase();
    }
    return false;
  }

  // let's do a recursive check on all objects to make sure they are deeply equal
  const obj1Keys = Object.keys(obj1);
  // make sure all obj keys are the same
  const allKeysExist = Object.keys(obj2).every(
    key => obj1Keys.indexOf(key) !== -1
  )
  // finally make sure all values are the same
  const allValuesAreEqual = obj1Keys.every(
    key => {
      const value1 = obj1[key];
      const value2 = obj2[key];
      if (typeof value1 === 'string' && typeof value2 === 'string') {
        return value1.toLowerCase() === value2.toLowerCase();
      } 
      return areTheTwoObjEqual(obj1[key], obj2[key])
    }
  )
  return allKeysExist && allValuesAreEqual
}

const App = () => {
  const [phonebook, setPhonebook] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-123456'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchResults, setSearchResults] = useState([])

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
      setPhonebook(phonebook.concat(phonebookObject))
      setNewName('')
      setNewNumber('')
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
      {/* <div className='border-b-2 border-gray-700'>
        <h2 className="text-xl font-bold uppercase tracking-wide bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text py-2">
          Numbers
        </h2>
        <ul>
          {phonebook.map(person => 
            <li key={person.number}>
              {person.number}
            </li>
          )}
        </ul>
      </div> */}
      <Contacts phonebook={phonebook} />
      <div>debug: {newName}</div>
    </div>
  )   
}

export default App