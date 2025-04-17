import Part from "./Part";
import {CoursePart} from "../types/course.type"

interface ContentProps {
  courseParts: Array<CoursePart>;
};

const Content = ({ courseParts }: ContentProps) => {
  return (
    <li>
      {courseParts.map((part, index) => (
        <ul key={index}>
          <Part coursePart={part} />
        </ul>
      ))}
    </li>
  );
};

export default Content;