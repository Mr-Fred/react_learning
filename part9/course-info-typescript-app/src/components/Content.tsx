interface ContentProps {
  courseParts: Array<{
    name: string;
    exerciseCount: number;
  }>;
};

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((part, index) => (
        <p key={index}>
          {part.name}: {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;