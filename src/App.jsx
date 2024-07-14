import { useState, useEffect } from 'react'
// import axios from 'axios'
import Contacts from './components/Contacts'
import ContactForm from './components/ContactForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
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
  const [notification, setNotification] = useState({
    message: '',
    type: ''
  })


  useEffect(() => {
    contactService
    .getAllContacts()
    .then(
      contacts => {
        setPhonebook(contacts)
      }
    )
    .catch(error => {
      displayNotif(error.message, 'error')
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
  }

  const displayNotif = (message, type) => {
    const notifObject = {
      message: message,
      type: type
    }
    setNotification(notifObject)
    setTimeout(() => {
      setNotification({
        message: '',
        type: ''
      })
    }, 5000)
  }

  const handleFormSubmission = (event) => {
    event.preventDefault()

    const phonebookObject = {
      name: newName,
      number: newNumber
    }

    let addNewContact = true;

    // Temporary solution. let's check if the new entry already exist then update or add new entry to the database
    contactService.getAllContacts().then(contacts => {
      contacts.some(
        person => {
          if (person.name === newName && person.number === newNumber) {
            displayNotif(`${newName} is already in the phonebook. Cancelling operation`, 'error')
            addNewContact = false; // Exact Match - Cancel
            return true;
          }
          else if (person.name === newName && person.number !== newNumber) {
            const update = window.confirm(
              `${newName} is already in the phonebook, replace the old number with a new one?`
            );
            update
            ? contactService
                .updateContact(person.id, phonebookObject)
                .then( () => {
                  contactService.getAllContacts()
                  .then(contacts => {
                    setPhonebook(contacts)
                  })
                  .catch(error => {
                    displayNotif(error.message, 'error')
                    setPhonebook.filter(
                      person => person.id !== person.id
                    )
                  })
                  setNewName('')
                  setNewNumber('')
                  displayNotif(`${newName}'s number has been successfully updated to ${newNumber}`, 'success')
                  addNewContact = false
                })
                .catch(
                  error => {
                    displayNotif(error.message, 'error')
                    addNewContact = false
                  }
                )
            : window.confirm(`There is a contact with name ${newName}. Do you want to add a new contact with the same name?`)
            ? contactService
                .addNewContact(phonebookObject)
                .then(newContact => {
                  setPhonebook(phonebook.concat(newContact))
                  setNewName('')
                  setNewNumber('')
                  displayNotif(`${newName} has been successfully added to the phonebook`, 'success')
                  addNewContact = false
                })
                .catch(error => {
                  displayNotif(error.message)
                  addNewContact = false
                })
            : displayNotif(`${newName} is already in the phonebook. Cancelling operation`, 'error');
            addNewContact = false
            return true;
          } 
          else if(person.name !== newName && person.number === newNumber){
            displayNotif(`${newNumber} is already in the phonebook. Cancelling operation`, 'error')
            addNewContact = false; // Number Match - Cancel
            return true;
          }
          else{
            return false;
          }
        }
      );

      if (addNewContact === true) {
        console.log(addNewContact)
        contactService
        .addNewContact(phonebookObject)
        .then(newContact => {
          setPhonebook(phonebook.concat(newContact))
          setNewName('')
          setNewNumber('')
          displayNotif(`${newName} has been successfully added to the phonebook`, 'success')
        })
        .catch(error => {
          displayNotif(error.message, 'error')
        })
      }
      setNewName('')
      setNewNumber('')
    })
    // End of temporary solution
  }

  const deleteContact = (id, name) => {
    if(window.confirm(`Are you sure you want to delete ${name}?`)){
      contactService
      .deleteContact(id)
      .then(
        () => {
          displayNotif(`${name} has been successfully deleted from the phonebook`, 'success')
        }
      )
      .catch(
        error => {
          if(error.response.status === 404){
            displayNotif(`Info on ${name} has already been deleted from the phonebook`, 'error')
          }
          else{
            displayNotif(error.message, 'error')
          }
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
      <Notification message={notification.message} type={notification.type} />
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