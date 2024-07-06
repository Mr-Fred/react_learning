import propTypes from 'prop-types'


const ContactForm = ({newName, newNumber, handleNameChange, handleNumberChange, handleFormSubmission}) => {
  return (
    <div className='border-b-2 border-gray-700'>
    <h2 className="text-xl font-bold uppercase tracking-wide bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text py-2">Add a new Contact</h2>
    <form onSubmit={handleFormSubmission} name='addContactForm' className='flex flex-col items-center justify-center p-2'>
        <label htmlFor='nameInput' className="text-sm font-medium text-gray-300 mb-2">
          Name:
        </label>
        <input
          id='nameInput'
          name='nameInput'
          type='text'
          placeholder='Enter your name'
          value={newName} 
          onChange={handleNameChange}
          className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <label htmlFor='numberInput' className="inline text-sm font-medium text-gray-300 mb-2">
          Phone Number:
        </label>
        <input
          id='numberInput'
          name='numberInput'
          type='string'
          placeholder='Enter your number'
          value={newNumber} 
          onChange={handleNumberChange}
          className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
          add Contact
      </button>

    </form> 
  </div>
  )
}

ContactForm.propTypes = {
  newName: propTypes.string,
  newNumber: propTypes.string,
  handleNameChange: propTypes.func,
  handleNumberChange: propTypes.func,
  handleFormSubmission: propTypes.func
}


export default ContactForm