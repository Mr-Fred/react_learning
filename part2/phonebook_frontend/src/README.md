# React + Vite Phonebook App

This React application provides a simple phonebook interface where users can add new contacts with names and phone numbers. It features dynamic search functionality to filter contacts and a clean, user-friendly interface.

## Tech Stack

- React: JavaScript library for building user interfaces.
- Vite: Fast development server and build tool.
- CSS: For styling the application.

## Key Features:

- **Add New Contacts:** Users can input a name and phone number to add new contacts to the phonebook.
- **Dynamic Search:** A search bar allows users to filter contacts by name in real-time.
- **Contact Display:** The application displays a list of all contacts or filtered contacts based on the search input.

## Components:

- **App:** The main component that renders the entire application.
- **Filter:** Handles the search input and filtering logic.
- **ContactForm:** Provides a form for adding new contacts.
- **Contacts:** Displays the list of contacts.

## Data Structure:

The phonebook data is stored in a JavaScript array of objects, where each object represents a contact with the following structure:
{ name: 'John Doe', number: '123-456-7890' }

## Functionality:

- **Adding Contacts:** When a user submits the form, a new contact object is created and added to the phonebook array.
- **Searching Contacts:** As the user types in the search bar, the `Persons` component dynamically filters the displayed contacts based on the input.
- **Displaying Contacts:** The `Persons` component renders a list of either all contacts or the filtered contacts.

## How to run the App
```
bash
git clone <repository-url>
cd <project-directory>
npm install
npm run dev
Open your web browser and visit `http://localhost:5173` to view the application.

```