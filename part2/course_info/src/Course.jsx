import PropTypes from 'prop-types';


const Header = ({name}) => {
  return(<h1 className='text-xl font-bold text-amber-700'>{name}</h1>)
}
Header.propTypes = {
  name: PropTypes.string.isRequired,
};

const Content = ({parts}) => {
  return(
  <>
    {parts.map(
      (part) => {
        return (
          <Part 
            key={part.name}
            name={part.name}
            exercises={part.exercises}
          />
        )
      }
    )}
  </>
  )
}

Content.propTypes = {
  parts: PropTypes.array.isRequired,
};

const Total = ({parts}) => {
  const total = parts.reduce(
    (acc, curr ) => acc + curr.exercises,
    0
  )
  return(
    <p className='font-bold'>Number of exercises: {total}</p>
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

const Course = ({course}) => {
  return(
    <div className='flex flex-col justify-center border-2 p-2 shadow-md'>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}
Course.propTypes ={
  course: PropTypes.object.isRequired
}

Part.propTypes = {
  name: PropTypes.string.isRequired,
  exercises: PropTypes.number.isRequired
};

export default Course