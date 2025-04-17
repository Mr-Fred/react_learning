import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";

import courseParts from "./types/course.type";

function App() {
  const courseName =  'Half Stack application development';

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
