import Course from './Course'
import { useState } from 'react'
import {courses} from './data'
import PropTypes from 'prop-types';


const App = ({props}) => {

  return (

    <div className="flex flex-col items-center justify-center max-w-7xl gap-5 mt-5">
      <h1 className='text-slate-700 text-2xl font-extrabold font-mono text-pretty'>Web Development Curiculum</h1>
      <ul className='grid grid-cols-2 gap-3 justify-center text-center'>
      {courses.map(
        (course) => {
          return <Course key={course.id} course={course}/>
        }
      )}
      </ul>
    </div>
  )
}

App.PropTypes = {
  notes: PropTypes.array.isRequired
}

export default App