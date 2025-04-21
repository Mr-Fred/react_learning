import { useState } from "react";
import { validateFormData } from "../utils";
import { NewDiaryEntry, Diary } from "../types";

interface NewDiaryFormProps {
  createDiary: (newDiary: NewDiaryEntry) => Promise<Diary>;
  setNewDiary: (newDiary: Diary) => void
}


const NewDiaryForm = ({ createDiary, setNewDiary}: NewDiaryFormProps) => {
    const [date, setDate] = useState("");
    const [weather, setWeather] = useState("");
    const [visibility, setVisibility] = useState("");
    const [comment, setComment] = useState("");

    const onSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const newEntry = {
            date,
            weather,
            visibility,
            comment,
        };
        const validatedFormData = validateFormData(newEntry);
        createDiary(validatedFormData)
            .then((createdDiary) => {
                setNewDiary(createdDiary);
            })
            .catch((error) => {
                console.error("Error creating diary entry:", error);
            });
    };
    return(
        <div className="new-diary-form">
            <h2>New Diary Entry</h2>
            <form onSubmit={onSubmit}>
              <label htmlFor="date">Date:</label>
              <input type="date" id="date" name="date"  value={date} onChange={(e) => setDate(e.target.value)} required />

              <div>
                Weather:
                <div style={{ display: 'flex', gap: '10px' }}>
                  <label>
                    <input
                      type="radio"
                      value="sunny"
                      name="weather"
                      checked={weather === 'sunny'}
                      onChange={(e) => setWeather(e.target.value)}
                      required
                    />
                    Sunny
                  </label>
                
                  <label>
                    <input
                      type="radio"
                      value="rainy"
                      name="weather"
                      checked={weather === 'rainy'}
                      onChange={(e) => setWeather(e.target.value)}
                      required
                    />
                    Rainy
                  </label>
                
                  <label>
                    <input
                      type="radio"
                      value="cloudy"
                      name="weather"
                      checked={weather === 'cloudy'}
                      onChange={(e) => setWeather(e.target.value)}
                      required
                    />
                    Cloudy
                  </label>
                
                  <label>
                    <input
                      type="radio"
                      value="stormy"
                      name="weather"
                      checked={weather === 'stormy'}
                      onChange={(e) => setWeather(e.target.value)}
                      required
                    />
                    Stormy
                  </label>
                
                  <label>
                    <input
                      type="radio"
                      value="windy"
                      name="weather"
                      checked={weather === 'windy'}
                      onChange={(e) => setWeather(e.target.value)}
                      required
                    />
                    Windy
                  </label>
                </div>
              </div>

              <div>
                Visibility:
                <div style={{ display: 'flex', gap: '10px' }}>
                  <label>
                    <input
                      type="radio"
                      value="great"
                      name="visibility"
                      checked={visibility === 'great'}
                      onChange={(e) => setVisibility(e.target.value)}
                      required
                    />
                    Great
                  </label>
                
                  <label>
                    <input
                      type="radio"
                      value="good"
                      name="visibility"
                      checked={visibility === 'good'}
                      onChange={(e) => setVisibility(e.target.value)}
                      required
                    />
                    Good
                  </label>
                
                  <label>
                    <input
                      type="radio"
                      value="ok"
                      name="visibility"
                      checked={visibility === 'ok'}
                      onChange={(e) => setVisibility(e.target.value)}
                      required
                    />
                    Ok
                  </label>
                
                  <label>
                    <input
                      type="radio"
                      value="poor"
                      name="visibility"
                      checked={visibility === 'poor'}
                      onChange={(e) => setVisibility(e.target.value)}
                      required
                    />
                    Poor
                  </label>
                </div>
              </div>

              <label htmlFor="comment">Comment:</label>
              <textarea id="comment" name="comment" value={comment} onChange={(e) => setComment(e.target.value)} />

              <button type="submit">Add Entry</button>
            </form>
        </div>
    )
}

export default NewDiaryForm;
