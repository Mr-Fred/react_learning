import axios from "axios";
import {Diary, NewDiaryEntry} from "../types";

const baseUrl = "http://localhost:3000/api/diaries";


const getAllDairies = async () => {
  try {
    const response = await axios.get<Diary[]>(baseUrl);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching diaries:', error.message);
      console.error('Error details:', error.response?.data);
      throw error.response?.data;
    }
    else {
      console.error('Unexpected error:', error);
      throw error;
    }
  }
};

const createDiary = async (newDiary: NewDiaryEntry) => {
  const response = await axios.post<Diary>(baseUrl, newDiary);
  return response.data;
};

export {
  getAllDairies,
  createDiary
}