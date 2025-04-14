import express, { Response } from 'express';
import { NonSensitiveDiaryEntry } from "../types";
import DiaryService from '../services/diaryService';
import toNewDiaryEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.send(DiaryService.getNonSensitiveEntries());
});

router.get('/:id', (req, res: Response<NonSensitiveDiaryEntry>) => {
  const diary = DiaryService.findById(+req.params.id);
  if (diary){
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});


router.post('/', (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);

    const addedEntry = DiaryService.addDiary(newDiaryEntry);

    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;