import { useState, useEffect } from 'react'
// import axios from 'axios'
import Contacts from './components/Contacts'
import ContactForm from './components/ContactForm'
import Filter from './components/Filter'
// import { areTheTwoObjEqual } from './lib/utilities'
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

    // let's check if the new entry already exist then update or add new entry to the database
    phonebook.find(
      person => {
        if (person.name === newName && person.number === newNumber) {
          alert(`${newName} is already in the phonebook. Cancelling operation`);
          return; // Exact Match - Cancel
        } else if (person.name === newName && person.number !== newNumber) {
          const update = window.confirm(
            `${newName} is already in the phonebook, replace the old number with a new one?`
          );
          return update
          ? contactService
              .updateContact(person.id, phonebookObject)
              // eslint-disable-next-line no-unused-vars
              .then( newContact => {
                contactService.getAllContacts()
                .then(contacts => {
                  setPhonebook(contacts)
                })
                .catch(error => {
                  console.log(error)
                })
                setNewName('')
                setNewNumber('')
              })
              
              .catch(
                error => {
                  console.log(error)
                }
              )
          : window.confirm(
            `There is a contact with name ${newName}. Do you want to add a new contact with the same name?`
          )
          ? contactService
              .addNewContact(phonebookObject)
              .then(newContact => {
                setPhonebook(phonebook.concat(newContact))
                setNewName('')
                setNewNumber('')
              })
              .catch(error => {
                console.log(error)
              })
          : alert(`${newName} is already in the phonebook. Cancelling operation`);
        }
 
      }
    );
    setNewName('')
    setNewNumber('')
    // Temporary solution to validate and update or add new entry to the database
    // if(isEntryExist.at(-1) === 'cancel'){
    //   alert(`${newName} is already in the phonebook. Cancelling operation`);
    //   return;
    // } else if(isEntryExist.at(-1) === 'update') {
    //   contactService
    //     .updateContact(phonebookObject)
    //     .then(newContact => {
    //       setPhonebook(phonebook.concat(newContact))
    //       setNewName('')
    //       setNewNumber('')
    //     })
    //     .catch(
    //       error => {
    //         console.log(error)
    //       }
    //     )
    // } else {
    //   contactService
    //     .addNewContact(phonebookObject)
    //     .then(newContact => {
    //       setPhonebook(phonebook.concat(newContact))
    //       setNewName('')
    //       setNewNumber('')
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // }

    // if (existingEntry) {
    //   // Existing entry found, handle based on returned value
    //   if (existingEntry === true) { // Exact Match (returned true)
    //     alert(`${newName} is already in the phonebook. Cancelling operation`);
    //   } else if (existingEntry === 'update') {
    //     // Update existing contact
    //     contactService
    //       .updateContact(phonebookObject)
    //       .then(updatedContact => {
    //         // Update phonebook state with updated contact
    //         setPhonebook(phonebook.map(contact => (contact.id === updatedContact.id ? updatedContact : contact)));
    //         setNewName('');
    //         setNewNumber('');
    //       })
    //       .catch(error => console.error(error));
    //   } else { // existingEntry === 'continue' (Add new contact with same name)
    //     // Add new contact
    //     contactService
    //       .addNewContact(phonebookObject)
    //       .then(newContact => {
    //         setPhonebook(phonebook.concat(newContact));
    //         setNewName('');
    //         setNewNumber('');
    //       })
    //       .catch(error => console.error(error));
    //   }
    // } else {
    //   // No existing entry, add new contact
    //   contactService
    //     .addNewContact(phonebookObject)
    //     .then(newContact => {
    //       setPhonebook(phonebook.concat(newContact));
    //       setNewName('');
    //       setNewNumber('');
    //     })
    //     .catch(error => console.error(error));
    // }

  }

  const deleteContact = (id, name) => {
    if(window.confirm(`Are you sure you want to delete ${name}?`)){
      contactService
      .deleteContact(id)
      .catch(
        error => {
          console.log(error)
        }
      )
    setPhonebook(phonebook.filter(
      person => person.id !== id
    ))
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
      <Contacts 
        deletePerson={deleteContact}
        phonebook={phonebook} />
      <div>debug: {newName}</div>
    </div>
  )   
}

export default App