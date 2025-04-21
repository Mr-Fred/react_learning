import {Diary} from "../types";

interface DiaryItemProps {
  diary: Diary;
}

const DiaryItem = ({ diary }: DiaryItemProps) => {
  return (
    <li className="diary-item">
      <h3>{diary.date}</h3>
      <p>Weather: {diary.weather}</p>
      <p>Visibility: {diary.visibility}</p>
      <p>Comment: {diary.comment}</p>
    </li>
  );
};

export default DiaryItem;