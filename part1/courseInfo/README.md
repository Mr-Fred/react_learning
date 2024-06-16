# React + Vite

This React application displays information about a course, "Half Stack application development". It breaks down the course into individual parts, each with its own name and number of exercises.

## Key Features:

- **Course Header:** Displays the course name using the Header component.
- **Course Content:** The Content component iterates through the course parts and renders each part using the Part component.
- **Exercise Total:** The Total component calculates and displays the total number of exercises across all course parts.

## Components:

**App:** The main component that renders the entire application.
**Header:** Displays the course name.
**Content:** Renders the individual course parts.
**Part:** Displays the name and number of exercises for a single course part.
**Total:** Calculates and displays the total number of exercises.

## Data Structure:

The course data is stored in a JavaScript object with the following structure:

`{
  name: 'Course Name',
  parts: [
    {
      name: 'Part Name',
      exercises: Number of Exercises
    },
    // ... more parts
  ]
}`

## Functionality:

The application dynamically renders the course information based on the data provided in the course object. It uses prop types to ensure that the components receive the correct data types.

Overall, this application provides a simple and clear way to display information about a course, making it easy for users to understand the course structure and content.

### How to start the app
``
Clone the app
cd /courseinfo
npm install
npm run dev

``
