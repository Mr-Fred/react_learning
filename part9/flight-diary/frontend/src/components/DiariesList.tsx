import { Diary } from "../types";
import DiaryItem from "./DiaryItem";

interface DiaryListProps {
  diaries: Diary[];
}

const DiariesList = ({ diaries }: DiaryListProps) => {
  return (
    <div className="diary-list">
      <h2>Diary Entries</h2>
      <ul>
        {diaries.map((diary) => (
          <DiaryItem key={diary.id} diary={diary} />
        ))}
      </ul>
    </div>
  );
};

export default DiariesList