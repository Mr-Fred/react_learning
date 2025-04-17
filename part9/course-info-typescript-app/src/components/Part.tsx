import {CoursePart} from "../types/course.type"
import assertNever from "../utils";

export default function Part({ coursePart }: { coursePart: CoursePart }) {
  const renderPart = () => {
    switch (coursePart.kind) {
      case "basic":
        return (
          <div>
            <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
            <p>{coursePart.description}</p>
          </div>
        );
      case "group":
        return (
          <div>
            <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
            <p>Group project count: {coursePart.groupProjectCount}</p>
          </div>
        );
      case "background":
        return (
          <div>
            <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
            <p>{coursePart.description}</p>
            <p>Background material: {coursePart.backgroundMaterial}</p>
          </div>
        );
      case "special":
        return (
          <div>
            <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
            <p>{coursePart.description}</p>
            <p>Required skills: {coursePart.requirements.join(", ")}</p>
          </div>
        );
      default:
        return assertNever(coursePart);
        // This function is used to ensure that all possible cases of a union type are handled.
    }
  }
  return(
    <>
      {renderPart()}
    </>
  )
};