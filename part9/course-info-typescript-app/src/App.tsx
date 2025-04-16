import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";

function App() {
  const courseName =  'Half Stack application development';
  const courseParts = [
    {
      name: 'Fundamentals of React',
      exerciseCount: 10
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7
    },
    {
      name: 'State of a component',
      exerciseCount: 14
    }
  ]

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0)

  return (
    <>
      <Header title={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </>
  );
};

export default App
