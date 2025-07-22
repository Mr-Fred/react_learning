
import PropTypes from 'prop-types';

const Header = ({course}) => {
  return(<h1>{course}</h1>)
}
Header.propTypes = {
  course: PropTypes.string.isRequired,
};


const Content = (props) => {
  const {parts} = props
  return(
  <>
    <Part name={parts[0].name} exercises={parts[0].exercises}/>
    <Part name={parts[1].name} exercises={parts[1].exercises}/>
    <Part name={parts[2].name} exercises={parts[2].exercises}/>
  </>
  )
}

Content.propTypes = {
  parts: PropTypes.array.isRequired,
};

const Total = ({parts}) => {
  const total = parts[0].exercises + parts[1].exercises + parts[2].exercises
  return(
    <p>Number of exercises: {total}</p>
  )
}

Total.propTypes = {
  parts: PropTypes.array.isRequired,
};

const Part = (props) => {
  return(
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

Part.propTypes = {
  name: PropTypes.string.isRequired,
  exercises: PropTypes.number.isRequired
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
 
  return (
    <div>
      <Header course={course.name}/>
      <Content 
        parts={course.parts}
      />
      <Total parts={course.parts}/>
    </div>
  )
}

export default App